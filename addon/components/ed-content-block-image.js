import Ember from 'ember';
import EdContentBlockComponent from '../components/ed-content-block';
import ContentImageMixin from '../mixins/content-image';
import layout from '../templates/components/ed-content-block-image';
import BgColorMixin from '../mixins/bg-color';

export default EdContentBlockComponent.extend(BgColorMixin, ContentImageMixin, {
    layout,

	img: Ember.computed("currentElement", function(){
		return this.get("currentElement") ? this.get("currentElement").getElementByTag("img") : null;
	}),

	a: Ember.computed("currentElement", function(){
		return this.get("currentElement") ? this.get("currentElement").getElementByTag("a") : null;
	}),

    emptyImageBackgroundColor: Ember.computed("currentElement.attributes.bgcolor", function(){
        const color = this.get("currentElement.attributes.bgcolor");

        if (!color) {
            return;
        }

        return Ember.String.htmlSafe("background-color:" + color);
    })
});
