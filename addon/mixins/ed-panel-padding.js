import Ember from 'ember';
import pxToInt from '../email-designer/px-to-int';

export default Ember.Mixin.create({
    contentWrapper: Ember.computed(function(){
        if (Ember.isNone(this.get("domElement"))) {
            return;
        }

        return this.get("domElement").getElementByTag("td");
    }).volatile(),

    paddingTop: pxToInt("contentWrapper.style.padding-top"),
    paddingRight: pxToInt("contentWrapper.style.padding-right"),
    paddingBottom: pxToInt("contentWrapper.style.padding-bottom"),
    paddingLeft: pxToInt("contentWrapper.style.padding-left")
});
