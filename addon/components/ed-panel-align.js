import Ember from 'ember';
import layout from '../templates/components/ed-panel-align';

export default Ember.Component.extend({
    layout,

    isAlignLeft: Ember.computed.equal("align", "left"),
    isAlignCenter: Ember.computed.equal("align", "center"),
    isAlignRight: Ember.computed.equal("align", "right"),

    actions: {
        setAlign(align){
            this.set("align", align);
        }
    }
});
