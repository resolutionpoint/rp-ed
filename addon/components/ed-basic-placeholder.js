import Ember from 'ember';

export default Ember.Component.extend({
    active: Ember.computed("edState.isModeDrag", "isMouseIn", function(){
        return this.get("isMouseIn") && this.get("edState.isModeDrag");
    }),

    error: Ember.computed("active", "edState.isModeDrag", "edState.moveElement.isContentBlock", function(){
        return (this.get("active") && this.get("edState.isModeDrag") && !this.get("edState.moveElement.isContentBlock"));
    })
});
