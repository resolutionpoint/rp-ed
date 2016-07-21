import Ember from 'ember';
import EdContentBlockComponent from '../components/ed-content-block';
import layout from '../templates/components/ed-content-block-text';
import { parseHTML } from "../email-designer/dom-utils";

export default EdContentBlockComponent.extend({
    layout,

    isTextEmpty: Ember.computed("currentElement.html", function(){
        return this.get("currentElement.childrenFrame.children")
            .filter(el => el.get("type") === "tag")
            .map(el => el.get("innerHTML"))
            .every(html => Ember.isBlank(html));
    }),

    emptyText: Ember.computed("isTextEmpty", function(){
        const clone = this.get("currentElement").cloneNode();
        const textElement = parseHTML("<p>Пожалуйста, введите сюда свой текст</p>");

        // TODO: fix side effect in getter
        clone.getElementByTag("td").append(textElement);
        return clone;
    })
});
