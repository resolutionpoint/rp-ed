import Ember from 'ember';
import layout from '../templates/components/ed-combobox';

export default Ember.Component.extend({
    layout,

    selection: null,

    actions: {
        selectOption(option){
            this.set("selection", option);
        }
    }
});
