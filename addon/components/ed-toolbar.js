import Ember from 'ember';
import layout from '../templates/components/ed-toolbar';

export default Ember.Component.extend({
    layout,

    classNames: ["ed-buttons-panel"],

    actions: {
        callAction(actionName){
            let actions = this.actions || this._actions;
            if(Ember.get(actions, actionName)) {
                this.send(actionName);
            } else {
                if (this.get("callAction")){
                    this.get("callAction")(actionName);
                }
            }
        }
    }
});
