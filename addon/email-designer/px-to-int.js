import Ember from 'ember';

export default function(prop){
    return Ember.computed(prop, {
        get(){
            const pt = this.get(prop);
            return Ember.isNone(pt) ? "" : parseInt(pt);
        },
        set(key, value, oldValue){
            if (value !== oldValue){
                this.set(prop, Ember.isEmpty(value) ? null : value + "px");
            }
            return value;
        }
    });
}
