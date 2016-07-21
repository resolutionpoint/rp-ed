import Ember from 'ember';
import layout from '../templates/components/ed-padding-box';

export default Ember.Component.extend({
    layout,
    classNames: ["ed-padding-box"],
    paddingStep: 1
});
