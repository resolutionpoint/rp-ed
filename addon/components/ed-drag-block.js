import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ["ed-drag-block"],
	attributeBindings: ["style"],
    x: null,
    y: null,

	style: Ember.computed("x", "y", function(){
		return Ember.String.htmlSafe(`border: 1px solid gray; width: 600px; background-color: #ffffff; left: ${this.get("x")}px; top: ${this.get("y")}px;`);
	})
});
