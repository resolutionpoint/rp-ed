import Ember from 'ember';
import layout from '../templates/components/ed-html-editor';

export default Ember.Component.extend({
    layout,
    html: null,

    change(){
        this.sendAction("on-change", this.get("html"))
    }
});
