import Ember from 'ember';

export default Ember.Object.extend({
    _attributes: null,

    _parseStyle(value){
        return (value || "")
            .split(";")
            .map(s => s.trim())
            .filter(s => s !== "")
            .reduce((css, exp) => {
                const s = exp.split(":").map(s => s.trim());
                css[s[0]] = s[1];
                return css;
            }, {});
    },

    unknownProperty(key){
        return this._parseStyle(this.get("_attributes.style"))[key];
    },

    setUnknownProperty(key, value){
        const css = this._parseStyle(this.get("_attributes.style"));

        if (Ember.isBlank(value)){
            delete css[key];
        } else {
            css[key] = value;
        }

        const cssStr = Object.keys(css).reduce((keyValue, key) => {
            keyValue.push( key + ":" + css[key]);
            return keyValue;
        }, []).join(";");

        this.set("_attributes.style", cssStr);
    }
});
