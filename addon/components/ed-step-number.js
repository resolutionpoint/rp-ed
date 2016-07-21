import Ember from 'ember';
import layout from '../templates/components/ed-step-number';

export default Ember.Component.extend({
    layout,

    classNames: ["ed-step-number"],
    attributeBindings: ["title"],
    tagName: "span",

    step: 1,

    normalizedValue: Ember.computed("value", function(){
        return Number(this.get("value"));
    }),

    disableIncrease: Ember.computed("step", "max", "normalizedValue", function(){
        return !Ember.isNone(this.get("max")) && this.get("normalizedValue") === this.computeNextIncValue();
    }),

    disableDecrease: Ember.computed("step", "min", "normalizedValue", function(){
        return !Ember.isNone(this.get("min")) &&  this.get("normalizedValue") === this.computeNextDecValue();
    }),

    computeNextIncValue() {
        const nextVal = this.get("normalizedValue") + this.get("step");

        return Ember.isNone(this.get("max")) ?
            nextVal :
            (this.get("max") > nextVal ? nextVal : this.get("max"));
    },

    computeNextDecValue() {
        const nextVal = this.get("normalizedValue") - this.get("step");

        return Ember.isNone(this.get("min")) ?
            nextVal :
            (this.get("min") < nextVal ? nextVal : this.get("min"));
    },

    actions: {
        increase(){
            this.set("value", this.computeNextIncValue());
        },

        decrease(){
            this.set("value", this.computeNextDecValue());
        }
    }
});
