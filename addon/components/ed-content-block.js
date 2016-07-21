import Ember from 'ember';
import layout from '../templates/components/ed-content-block';

export default Ember.Component.extend({
    layout,

    currentElement: Ember.computed("isEdit", "edState.editElement", "domElement", function(){
        return this.get("isEdit") ? this.get("edState.editElement") : this.get("domElement");
    }),

    bgColor: Ember.computed("edState.editElement.attributes.bgcolor", "edState.editElement.style.background-color", {
        get(){
            return this.get("edState.editElement.attributes.bgcolor") || "";
        },
        set(key, value, oldValue){
            if (value !== oldValue) {
                this.set("edState.editElement.style.background-color", value);
                this.set("edState.editElement.attributes.bgcolor", value);
            }

            return value;
        }
    })

});
