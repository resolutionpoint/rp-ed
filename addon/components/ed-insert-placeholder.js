import Ember from 'ember';
import MouseInMixin from '../mixins/mouse-in';
import layout from '../templates/components/ed-insert-placeholder';

export default Ember.Component.extend(MouseInMixin, {
    layout,

    canShowPlaceholder: Ember.computed("isMouseIn", "edState.isModeDrag", function(){
        return this.get("isMouseIn") && this.get("edState.isModeDrag");
    }),

    isInsertBefore: Ember.computed("canShowPlaceholder", "topBottom", function(){
        return this.get("canShowPlaceholder") && this.get("topBottom") === "top";
    }),

    isInsertAfter: Ember.computed("canShowPlaceholder", "topBottom", function(){
        return this.get("canShowPlaceholder") && this.get("topBottom") === "bottom";
    }),

    mouseMove(event){
        if (this.get("canShowPlaceholder")) {
            const $this = this.$(".ed-center-block");

            if (($this.offset().top + $this.height() / 2) > event.pageY ){
                this.set("topBottom", "top");
            } else {
                this.set("topBottom", "bottom");
            }
        }
    },

    actions: {
        inserted(){
            this.set("isMouseIn", false);
            this.sendAction("inserted");
        }
    }
});
