import Ember from 'ember';
import ColPickMixin from 'ember-colpick/mixins/col-pick';

export default Ember.TextField.extend(ColPickMixin, {
    flat: false,
    color: null,
    value: Ember.computed.alias("color"),
    colorScheme: "light",
    useHashtag: true
});
