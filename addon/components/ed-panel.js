import Ember from 'ember';
import layout from '../templates/components/ed-panel';
import { asyncParseHTML } from "../email-designer/dom-utils";

export default Ember.Component.extend({
    layout,

    classNames: ["ed-panel"],

    isBlocks: Ember.computed("edState.mode", function(){
        const mode = this.get("edState.mode");
        return Ember.isNone(mode) || mode === "blocks";
    }),

    isBody: Ember.computed.equal("edState.mode", "body"),
    isEdit: Ember.computed.equal("edState.mode", "edit"),

    optionsPaddingTop: 38,
    optionsPaddingBottom: Ember.computed("isEdit", function(){
        return this.get("isEdit") ? 50 : 0;
    }),

    panelComponentName: Ember.computed("edState.editElement.componentName", function(){
        const type = this.get("edState.editElement.contentBlockType");
        if (Ember.isNone(type)) {
            return;
        }

        return "ed-panel-" + type;
    }),

    actions: {
        setMode(mode){
            this.set("edState.mode", mode);
        },

        dragBlock(klass){
            asyncParseHTML(klass.htmlText, (dragElement) => {
                this.get("edState").beginDragElement(dragElement);
            });
        },

        save(){
            this.get("edState").endEditElement(true);
        },

        cancel(){
            this.get("edState").endEditElement(false);
        }
    }
});
