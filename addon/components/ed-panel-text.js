import Ember from 'ember';
import EdPanelPaddingMixin from '../mixins/ed-panel-padding';
import layout from '../templates/components/ed-panel-text';
import { parseHTML } from "../email-designer/dom-utils";

export default Ember.Component.extend(EdPanelPaddingMixin, {
    layout,

	text: Ember.computed("domElement.childrenFrame.innerHTML", function(){
		return this.get("domElement.childrenFrame.innerHTML");
	}),

    actions: {
    	onChange(data){
    		const html = "<div>" + data + "</div>";
			const appendElements = parseHTML(html);

			this.set("domElement.childrenFrame.children", Ember.A());

			appendElements.get("children").forEach(el =>{
				this.get("domElement.childrenFrame").append(el);
			});
    	}
    }
});
