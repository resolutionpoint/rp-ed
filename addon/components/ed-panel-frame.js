import Ember from 'ember';
import EdPanelPaddingMixin from '../mixins/ed-panel-padding';
import layout from '../templates/components/ed-panel-frame';

export default Ember.Component.extend(EdPanelPaddingMixin, {
    layout,
	columns: Ember.computed("edState.editElement", function(){
		return this.get("edState.editElement.children.0.children.0.children");
	})
});
