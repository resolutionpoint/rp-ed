import MouseInMixin from '../mixins/mouse-in';
import EdBasicPlaceholderComponent from '../components/ed-basic-placeholder';
import ContentBlockPlaceholder from '../email-designer/content-block-placeholder';
import layout from '../templates/components/ed-temp-placeholder-insert-before';
import { parseHTML } from "../email-designer/dom-utils";

export default EdBasicPlaceholderComponent.extend(MouseInMixin, {
    layout,

	mouseUp(){
		if (this.get("edState.isModeDrag")){
			if (this.get("edState.moveElement.parent.children")){
				if (this.get("edState.moveElement.parent.children.length") === 1) {
					this.get("edState.moveElement").replaceElement(parseHTML(ContentBlockPlaceholder.htmlText));
				} else {
					this.get("edState.moveElement.parent.children").removeObject(this.get("edState.moveElement"));
				}
			}

			var idx = this.get("domElement.parent.children").indexOf(this.get("domElement"));

			this.set("edState.moveElement.parent", this.get("domElement.parent"));
			this.get("domElement.parent.children").insertAt(idx, this.get("edState.moveElement"));
			this.sendAction("inserted");
		}
	}
});
