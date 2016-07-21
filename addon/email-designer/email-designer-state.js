import Ember from 'ember';

export default Ember.Object.extend({
    mode: null, // modes: "drag", "edit", null (null is highlight mode)

    moveElement: null,
    editElement: null,

    _callback: null,

    isHighlightMode: Ember.computed("isModeDrag", "isModeEdit", function(){
        return !this.get("isModeDrag") && !this.get("isModeEdit");
    }),
    isModeDrag: Ember.computed.equal("mode", "drag"),
    isModeEdit: Ember.computed.equal("mode", "edit"),

    beginDragElement(moveElement){
        this.set("mode", "drag");
        this.set("moveElement", moveElement);
    },

    endDragElement(){
        this.set("mode", null);
        this.set("moveElement", null);
    },

    beginEditElement(editElement, callback){
        this.set("mode", "edit");
        this.set("editElement", editElement);
        this.set("_callback", callback);
    },

    endEditElement(success){
        if (this.get("_callback")){
            this.get("_callback")(success, this.get("editElement"));
            this.set("_callback", null);
        }

        this.set("mode", null);
        this.set("editElement", null);
    }
});
