import Ember from 'ember';
import layout from '../templates/components/ed-visual';

export default Ember.Component.extend({
    layout,
    classNames: ["ed-visual"],
    domElement: null,
    edState: null,

    mouseUp(){
        if (this.get("edState.isModeDrag")) {
            this.get("edState").endDragElement();
        }
    },

    mouseMove(event){
        if (this.get("edState.isModeDrag")){
            const offset = this.$().offsetParent().offset();
            this.set("moveX", event.pageX - offset.left + 33);
            this.set("moveY", event.pageY - offset.top + 33);
        }
    },

    moveElements: Ember.computed("edState.moveElement", function(){
        return this.get("edState.moveElement") ? [this.get("edState.moveElement")] : [];
    }),

    domElements: Ember.computed("domElement", function(){
        return this.get("domElement") ? [this.get("domElement")] : [];
    })
});
