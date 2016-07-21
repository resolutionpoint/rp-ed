import Ember from 'ember';
import EdPanelPaddingMixin from '../mixins/ed-panel-padding';
import layout from '../templates/components/ed-panel-button';
import pxToInt from '../email-designer/px-to-int';
import percentToInt from '../email-designer/percent-to-int';
import { parseHTML } from "../email-designer/dom-utils";

export default Ember.Component.extend(EdPanelPaddingMixin, {
    layout,

    link: Ember.computed(function(){
        return this.get("domElement").getElementByClassName("ed-button-link");
    }),

    buttonLink: Ember.computed.alias("link.attributes.href"),

    buttonColor: Ember.computed("link.style.background-color", {
        get(){
            return this.get("link.style.background-color");
        },
        set(key, value){
            this.set("link.style.background-color", Ember.isBlank(value) ? null : value);

            return value;
        }
    }),

    buttonBorderRadius: pxToInt("link.style.border-radius"),

    align: Ember.computed.alias("contentWrapper.attributes.align"),

    buttonWidth: percentToInt("link.style.width"),

    text: Ember.computed(function(){
        return this.get("domElement").getElementByClassName("ed-button-text");
    }),

    buttonText: Ember.computed("text.innerHTML", function(){
        return this.get("text.innerHTML");
    }),

    actions: {
        onChange(data){
            const html = "<div>" + data + "</div>";
            const appendElements = parseHTML(html);

            this.set("text.children", Ember.A());

            appendElements.get("children").forEach(el => {
                this.get("text").append(el);
            });
        }
    }
});
