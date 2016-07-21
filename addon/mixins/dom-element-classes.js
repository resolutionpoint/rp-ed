import Ember from 'ember';

export default Ember.Mixin.create({
    isTag: Ember.computed.equal("type", "tag"),
    isBrTag: Ember.computed.equal("name", "br"),
    isText: Ember.computed.equal("type", "text"),

    classes: Ember.computed("attributes.class", function(){
        return Ember.A((this.get("attributes.class") || "")
            .split(" ")
            .filter(klass => !Ember.isEmpty(klass)));
    }),

    isContentBlock: Ember.computed("classes", function(){
        return this.get("classes").some(className => className === "ed-content-block");
    })
});
