import Ember from 'ember';

export default function(prop){
    return Ember.computed(prop, {
        get(){
            return parseInt(this.get(prop));
        },
        set(key, value, oldValue){
            if (value !== oldValue){
                this.set(prop, value + "%");
            }
            return value;
        }
    });
}
