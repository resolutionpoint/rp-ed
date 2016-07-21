import Ember from 'ember';
import layout from '../templates/components/ed-dom-element';

export default Ember.Component.extend({
    layout,

	init(){
		this._super(...arguments);

		this.set("tagName", this.get("domElement.name"));

		this.set("attributeBindings", Ember.A());

		this.updateAttributeBindings();
	},

	updateAttributeBindings: Ember.observer("domElement.attributes._props.length", function(){
		if (Ember.isNone(this.get("domElement"))) {
			return;
		}

		const attrs = this.get("domElement.attributes._props").mapBy("key");
		const bindedAttrs = this.get("attributeBindings");

		let addedAttrs = attrs.filter(attrName => {
			return !bindedAttrs.contains(attrName);
		});

		const hasClass = addedAttrs.some(key => key === "class");
		if (hasClass){
			addedAttrs = addedAttrs.filter(key => key !== "class");

			const classes = Ember.A(this.get("domElement.attributes.class").split(" ")).reject(Ember.isBlank);
			this.set("classNames", classes);
		}

		addedAttrs.forEach(key => {
			const binding = Ember.Binding.from("domElement.attributes." + key).to(key);
			binding.connect(this);
		});

		bindedAttrs.pushObjects(addedAttrs);

		if (this._state === "inDOM") {
			this.rerender();
		}
	}),

	_isElementRendered: false,
	setIsRendered: Ember.on("didRender", function(){
		this.set("_isElementRendered", true);
	}),

	children: Ember.computed("_isElementRendered", "domElement.children", function(){
		return this.get("_isElementRendered") ? this.get("domElement.children") : [];
	}),

	click(event){
		event.preventDefault();
		return false;
	}
});
