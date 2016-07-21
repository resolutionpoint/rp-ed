import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ["ed-adopt-height"],

    attributeBindings: ["style"],

    paddingTop: 0,
    paddingBottom: 0,

    init(){
        this._super(...arguments);
        this.set("_resize", () => { this.notifyPropertyChange("windowHeight") });
    },

    subscribeResize: Ember.on("didInsertElement", function(){
        Ember.$(window).on("resize", this.get("_resize"));
    }),

    unsubscribeResize: Ember.on("willDestroyElement", function(){
        Ember.$(window).off("resize", this.get("_resize"));
    }),

    windowHeight: Ember.computed(function(){
        return Ember.$(window).height();
    }),

    style: Ember.computed("windowHeight", "paddingTop", "paddingBottom", function(){
        const height = this.get("windowHeight") - this.get("paddingTop") - this.get("paddingBottom");
        return Ember.String.htmlSafe(`height: ${height}px`);
    })
});
