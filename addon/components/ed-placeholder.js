import Ember from 'ember';
import MouseInMixin from '../mixins/mouse-in';
import StructureHighlightMixin from '../mixins/structure-highlight';
import EdBasicPlaceholderComponent from '../components/ed-basic-placeholder';
import ContentBlockPlaceholder from '../email-designer/content-block-placeholder';
import layout from '../templates/components/ed-placeholder';

export default EdBasicPlaceholderComponent.extend(MouseInMixin, StructureHighlightMixin, {
    layout,

	isShowHighlight: Ember.computed.alias("isShowFrameBlockPanel"),

	isShowFrameBlockPanel: Ember.computed("edState.isHighlightMode", "isMouseIn", "domElement.parentFrame.isBody", function(){
		return this.get("edState.isHighlightMode") && this.get("isMouseIn") && this.get("domElement.parentFrame.isBody");
	}),

	canShowPlaceholder: Ember.computed("domElement.parentFrame.isBody", "active", "edState.moveElement.isFrameBlock", "edState.isModeDrag", function(){
		return this.get("domElement.parentFrame.isBody") && this.get("active") &&
			this.get("edState.moveElement.isFrameBlock") && this.get("edState.isModeDrag");
	}),

	mouseUp(){
		if (this.get("edState.isModeDrag") && !this.get("error")){
			if (this.get("edState.moveElement.parent.children")){
				if (this.get("edState.moveElement.parent.children.length") === 1) {
					this.get("edState.moveElement").replaceElement(this.get("edState").parseHTML(ContentBlockPlaceholder.htmlText));
				} else {
					this.get("edState.moveElement.parent.children").removeObject(this.get("edState.moveElement"));
				}
			}

			this.get("domElement").replaceElement(this.get("edState.moveElement"));
		}
	},

	actions: {
		moveFrameBlock(){
			this.get("edState").beginDragElement(this.get("domElement"));
		},

		removeFrameBlock(){
			if (this.get("domElement.parentFrame.isBody") && this.get("domElement.parentFrame.childrenFrame.children.length") === 1){
				this.get("domElement").replaceElement(this.get("edState").parseHTML(ContentBlockPlaceholder.htmlText));
			} else {
				this.get("domElement").removeElement();
			}
		}
	}
});
