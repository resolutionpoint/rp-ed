import Ember from 'ember';

export default Ember.Mixin.create({
	currentElement: Ember.computed("isEdit", "edState.editElement", "domElement", function(){
        return this.get("isEdit") ? this.get("edState.editElement") : this.get("domElement");
    }),

	img: Ember.computed("currentElement", function(){
		if (Ember.isNone(this.get("currentElement"))) {
            return;
        }

		return this.get("currentElement").getElementByTag("img");
	}),

	a: Ember.computed("currentElement", function(){
		if (Ember.isNone(this.get("currentElement"))) {
            return;
        }

		return this.get("currentElement").getElementByTag("a");
	}),

	imageSrc: Ember.computed.alias("img.attributes.src"),

	imageAlt: Ember.computed.alias("img.attributes.alt"),

	imageLink: Ember.computed.alias("a.attributes.href")
});
