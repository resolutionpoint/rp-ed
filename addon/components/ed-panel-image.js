import Ember from 'ember';
import EdPanelPaddingMixin from '../mixins/ed-panel-padding';
import ContentImageMixin from '../mixins/content-image';
import layout from '../templates/components/ed-panel-image';

export default Ember.Component.extend(ContentImageMixin, EdPanelPaddingMixin, {
    layout,

    isFullWidth: Ember.computed("img.style.width", {
        get(){
            return this.get("img.style.width") === "100%";
        },
        set(key, value){
            if (value){
                this.set("img.style.width", "100%");
                this.set("img.attributes.width", "100%");
                this.set("img.style.height", null);
                this.set("img.attributes.height", null);
                this.set("align", null);
            } else {
                this.set("img.style.width", null);
                this.set("img.style.height", null);
                this.set("img.attributes.width", null);
                this.set("img.attributes.height", null);
                this.set("align", "center");
            }
            return value;
        }
    }),

    contentWrapper: Ember.computed("domElement", function(){
        if (Ember.isNone(this.get("domElement"))) {
            return;
        }

        return this.get("domElement").getElementByTag("td");
    }),

    align: Ember.computed.alias("contentWrapper.attributes.align"),

    imageHeight: Ember.computed("img.attributes.height", {
        get(){
            return this.get("img.attributes.height");
        },
        set(key, value){
            this.set("img.attributes.height", value);
            this.set("img.style.height", value + "px");
            return value;
        }
    }),

    imageWidth: Ember.computed("img.attributes.width", {
        get(){
            return this.get("img.attributes.width");
        },
        set (key, value){
            this.set("img.attributes.width", value);
            this.set("img.style.width", value + "px");
            return value;
        }
    })
});
