import Ember from 'ember';
import MouseInMixin from '../mixins/mouse-in';
import ContentBlockPlaceholder from '../email-designer/content-block-placeholder';
import layout from '../templates/components/ed-content-block-wrapper';
import { parseHTML } from "../email-designer/dom-utils";

export default Ember.Component.extend(MouseInMixin, {
    layout,

    isShowContentBlockPanel: Ember.computed("edState.isHighlightMode", "isMouseIn", function(){
        return this.get("edState.isHighlightMode") && this.get("isMouseIn");
    }),

    isElementMoving: Ember.computed("domElement", "edState.moveElement", function(){
        return this.get("domElement") === this.get("edState.moveElement");
    }),

    canShowPlaceholder: Ember.computed("isMouseIn", "edState.isModeDrag", "isElementMoving", "edState.moveElement.isFrameBlock", "domElement.parentFrame.isBody", "domElement.parentFrame.isFrameBlock", function(){
        return this.get("isMouseIn") && this.get("edState.isModeDrag") && !this.get("isElementMoving") &&
            (this.get("domElement.parentFrame.isBody") ||
            !this.get("edState.moveElement.isFrameBlock") && this.get("domElement.parentFrame.isFrameBlock"));
    }),

    isShowHighlight: Ember.computed.oneWay("isShowContentBlockPanel"),

    classNameBindings: ["isShowHighlight:ed-block-focus"],

    actions: {
        editContentBlock(){
            this.set("isEdit", true);
            this.set("editElement", this.get("domElement").cloneNode());
            this.set("edState.editComponent", this.get("parentView"));

            this.get("edState").beginEditElement(this.get("editElement"), (success, editElement) => {
                if (success) {
                    this.get("domElement").replaceElement(editElement);
                    this.set("domElement", editElement);
                }

                this.set("isEdit", false);
            });
        },

        moveContentBlock(){
            this.get("edState").beginDragElement(this.get("domElement"));
        },

        cloneContentBlock(){
            var clone = this.get("domElement").cloneNode();

            this.get("domElement").insertAfter(clone);
        },

        removeContentBlock(){
            if (this.get("domElement.parent.children.length") === 1) {
                this.get("domElement").replaceElement(parseHTML(ContentBlockPlaceholder.htmlText));
            } else {
                this.get("domElement").removeElement();
            }
        },

        inserted(){
            this.set("isMouseIn", false);
        }
    }
});
