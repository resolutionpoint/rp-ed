import DomElementComponent from '../components/ed-dom-element';
import BgColorMixin from '../mixins/bg-color';

export default DomElementComponent.extend(BgColorMixin, {
    init(){
        this._super(...arguments);

        this.set("edState.backgroundComponent", this);
    }
});
