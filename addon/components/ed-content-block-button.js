import Ember from 'ember';
import EdContentBlockComponent from '../components/ed-content-block';
import layout from '../templates/components/ed-content-block-button';
import BgColorMixin from '../mixins/bg-color';
import { parseHTML } from "../email-designer/dom-utils";

export default EdContentBlockComponent.extend(BgColorMixin, {
    layout,

    isTextEmpty: Ember.computed("currentElement.html", function(){
        return this.get("currentElement")
            .getElementByClassName("ed-button-text")
            .get("children")
            .filter(el => el.get("type") === "tag")
            .map(el => el.get("innerHTML"))
            .every(html => Ember.isBlank(html));
    }),

    emptyText: Ember.computed("isTextEmpty", function(){
        const clone = this.get("currentElement").cloneNode();
        const textElement = parseHTML('<p style="display: block; font-family: Arial; color: #000;  font-size: 16px;">Пожалуйста, введите сюда свой текст</p>');

        clone.getElementByClassName("ed-button-text").append(textElement);
        return clone;
    })
});
