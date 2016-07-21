import Ember from 'ember';
import EdPanelPaddingMixin from '../mixins/ed-panel-padding';
import layout from '../templates/components/ed-panel-divider';
import pxToInt from '../email-designer/px-to-int';
import percentToInt from '../email-designer/percent-to-int';

export default Ember.Component.extend(EdPanelPaddingMixin, {
    layout,

    line: Ember.computed("contentWrapper", function(){
        if (Ember.isNone(this.get("contentWrapper"))) {
            return;
        }

        return this.get("contentWrapper").getElementByTag("table");
    }).volatile(),

    lineColor: Ember.computed.alias("line.style.border-top-color"),
    lineWidth: percentToInt("line.style.width"),
    lineThickness: pxToInt("line.style.border-top-width"),

    styles: Ember.A([ {
        id: "solid",
        name: "Сплошная"
    }, {
        id: "dotted",
        name: "Точки"
    }, {
        id: "dashed",
        name: "Тире"
    }, {
        id: "double",
        name: "Двойная"
    }]),

    lineStyleId: Ember.computed.alias("line.style.width", {
        get(){
            return this.get("line.style.border-top-style");
        },
        set(key, value){

            this.set("line.style.border-top-style", value || "solid");
            return value;
        }
    }),

    lineStyle: Ember.computed("lineStyleId", {
        get(){
            return this.get("styles").findBy("id", this.get("lineStyleId"));
        },
        set(key, value, oldValue){
            if (value !== oldValue) {
                this.set("lineStyleId", Ember.get(value, "id"));
            }

            return value;
        }
    }),

    align: Ember.computed.alias("line.attributes.align")
});
