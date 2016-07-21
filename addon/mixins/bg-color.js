import Ember from 'ember';

export default Ember.Mixin.create({
    bgColor: Ember.computed("domElement.style.background-color", {
        get(){
            return this.get("domElement.style.background-color");
        },
        set(key, value, oldValue){
            if (value !== oldValue) {
                this.set("domElement.style.background-color", value);
                this.set("domElement.attributes.bgcolor", value);
            }
            return value;
        }
	})
});
