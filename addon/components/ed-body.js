import Ember from 'ember';
import DomElementComponent from '../components/ed-dom-element';
import BgColorMixin from '../mixins/bg-color';

export default DomElementComponent.extend(BgColorMixin, {
    classNames: ["ed-body"],

    init(){
        this._super();

        this.set("edState.bodyComponent", this);
    },

    bodyWidth: Ember.computed("domElement.attributes.width", "domElement.style.min-width", {
        get(){
            return this.get("domElement.attributes.width");
        },
        set(key, value){
            this.set("domElement.style.min-width", value + "px");
            this.set("domElement.attributes.width", value);
            return value;
        }
    })
});
