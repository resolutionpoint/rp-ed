import Ember from 'ember';
import layout from '../templates/components/ed-button';

export default Ember.Component.extend({
    layout,
    tagName: "button",

    classNames: ['btn'],
    classNameBindings: ['activeClassNameProp'],
    attributeBindings: ['title', 'disabled'],

    activeClassName: "active",
    activeClassNameProp: Ember.computed("isActive", "activeClassName", function(){
        return this.get("isActive") ? this.get("activeClassName") : null;
    }),

    click(){
        this.send("action");
    },

    actions: {
        action(){
            if (typeof this.get('action') === "function") {
                this.get('action')();
            }
        }
    }
});
