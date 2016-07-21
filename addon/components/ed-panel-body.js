import Ember from 'ember';
import EdPanelPaddingMixin from '../mixins/ed-panel-padding';
import layout from '../templates/components/ed-panel-body';

export default Ember.Component.extend(EdPanelPaddingMixin, {
    layout,

    domElement: Ember.computed.alias("edState.bodyComponent.domElement"),

    fonts: [
        Ember.Object.create({ id: "Arial", name: "Arial" , family: "sans-serif" }),
        Ember.Object.create({ id: "Arial Black", name: "Arial Black" , family: "sans-serif" }),
        Ember.Object.create({ id: "Tahoma", name: "Tahoma" , family: "sans-serif" }),
        Ember.Object.create({ id: "Trebuchet MS", name: "Trebuchet MS" , family: "sans-serif" }),
        Ember.Object.create({ id: "Verdana", name: "Verdana" , family: "sans-serif" }),
        Ember.Object.create({ id: "Century Gothic", name: "Century Gothic" , family: "sans-serif" }),
        Ember.Object.create({ id: "Geneva", name: "Geneva" , family: "sans-serif" }),
        Ember.Object.create({ id: "Lucida", name: "Lucida" , family: "sans-serif" }),
        Ember.Object.create({ id: "Lucida Sans", name: "Lucida Sans" , family: "sans-serif" }),
        Ember.Object.create({ id: "Lucida Grande", name: "Lucida Grande" , family: "sans-serif" }),
        Ember.Object.create({ id: "Courier", name: "Courier" , family: "serif" }),
        Ember.Object.create({ id: "Courier New", name: "Courier New" , family: "serif" }),
        Ember.Object.create({ id: "Georgia", name: "Georgia" , family: "serif" }),
        Ember.Object.create({ id: "Times", name: "Times" , family: "serif" }),
        Ember.Object.create({ id: "Times New", name: "Times New Roman" , family: "serif" }),
        Ember.Object.create({ id: "MS Serif", name: "MS Serif" , family: "serif" }),
        Ember.Object.create({ id: "New York", name: "New York" , family: "serif" }),
        Ember.Object.create({ id: "Palatino", name: "Palatino" , family: "serif" }),
        Ember.Object.create({ id: "Palatino Linotype", name: "Palatino Linotype" , family: "serif" }),
        Ember.Object.create({ id: "Lucida Console", name: "Lucida Console" , family: "monospace" }),
        Ember.Object.create({ id: "Monaco", name: "Monaco" , family: "monospace" })
    ],

    selectedFont: Ember.computed("domElement.style.font-family", {
        get(){
            const fontName = (this.get("domElement.style.font-family") || "").split(",")[0];

            if (Ember.isBlank(fontName)) {
                return;
            }

            return Ember.A(this.get("fonts")).filterBy("name", fontName)[0];
        },
        set(key, value){
            const fontFamily = value && [value.name, value.family].join(",");
            this.set("domElement.style.font-family", fontFamily);

            return value;
        }
    })
});
