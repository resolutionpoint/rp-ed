import Ember from 'ember';

export default Ember.Object.extend({
    _props: Ember.computed(function(){
        return Ember.A();
    }),

    setUnknownProperty(key, value){
        if (/^_/.test(key)) {
            return;
        }

        Ember.defineProperty(this, key);

        const attributeObject = Ember.Object.extend({
            key: key,
            _props: this,
            valueBinding: "_props." + key,
            innerHTML: Ember.computed("value", function(){
                return this.get("value");
            }),

            html: Ember.computed("key", "value", "innerHTML", function(){
                return this.get("key") + "=\"" + this.get("_props." + this.get("key")) + "\"";
            })
        }).create();

        this.set(key, value);

        this.get("_props").pushObject(attributeObject);
    },

    html: Ember.computed("_props.@each.html" , function(){
        return (" " + this.get("_props").mapBy("html").join(" ")).replace(/\s$/, "");
    })
});
