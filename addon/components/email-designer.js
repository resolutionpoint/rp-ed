import Ember from 'ember';
import layout from '../templates/components/email-designer';
import EmailDesignerState from '../email-designer/email-designer-state';
import ContentBlockText from '../email-designer/content-block-text';
import ContentBlockImage from '../email-designer/content-block-image';
import ContentBlockButton from '../email-designer/content-block-button';
import ContentBlockDivider from '../email-designer/content-block-divider';
import ContentBlockSocial from '../email-designer/content-block-social';
import FrameBlockColumns2 from '../email-designer/frame-block-columns2';
import FrameBlockColumns3 from '../email-designer/frame-block-columns3';
import Templates from '../email-designer/templates';
import { parseHTML, asyncParseHTML } from "../email-designer/dom-utils";


export default Ember.Component.extend({
    layout,

    domElement: null,

    classNames: ["email-designer", "stopselect"],
    isDesignMode: false,

    isTrySwitchToDesignMode: false,

    isInDom: false,
    didRender(){
        this.set("isInDom", true);
    },

    isEmailValid(domElement){
        if (Ember.isNone(domElement)) {
            return false;
        }

        const edBackground = domElement.getElementByClassName("ed-background");

        if (Ember.isNone(edBackground)) {
            return false;
        }

        const edBody = edBackground.getElementByClassName("ed-body");

        if (Ember.isNone(edBody)) {
            return false;
        }

        return true;
    },

    trySwitchToDesignerMode(){
        this.set("isTrySwitchToDesignMode", true);
        asyncParseHTML(this.get("body"), domElement => {
            this.set("isDesignMode", this.isEmailValid(domElement));
            this.set("domElement", this.get("isDesignMode") ? domElement : null);
            this.set("isTrySwitchToDesignMode", false);
        });
    },

    edState: Ember.computed("isDesignMode", function(){
        return EmailDesignerState.extend({
            _optionsSource: this,
            optionsBinding: "_optionsSource.options"
        }).create();
    }),

    _body: null,
    body: Ember.computed("_body", {
        get(){
            return this.get("_body");
        },
        set(key, value, oldValue){
            if (value !== oldValue) {
                this.set("_body", value);
                Ember.run.next(this, this.trySwitchToDesignerMode);
            }
            return value;
        }
    }),

    _updateBody(){
        if (this.get("domElement")) {
            this.set("_body", this.get("domElement.html"));
        }
    },

    updateBody: Ember.observer("domElement", "domElement.html", function(){
        Ember.run.debounce(this, this._updateBody, 50);
    }),

    blocks: Ember.computed(function(){
        return [
            { type: "text", label: "Текст", klass: ContentBlockText },
            { type: "image", label: "Изображение", klass: ContentBlockImage },
            { type: "button", label: "Кнопка", klass: ContentBlockButton },
            { type: "divider", label: "Разделитель", klass: ContentBlockDivider },
            { type: "social", label: "Группы", klass: ContentBlockSocial },
            { type: "columns2", label: "2 колонки", klass: FrameBlockColumns2 },
            { type: "columns3", label: "3 колонки", klass: FrameBlockColumns3 }
        ];
    }),

    defaultTemplate: Ember.computed(function(){
        return Templates.get("emptyMessageTemplate");
    }),

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
        },

        switchToDesignerMode(){
            this.set("isTrySwitchToDesignMode", true);
            asyncParseHTML(this.get("body"), domElement => {
                this.set("isTrySwitchToDesignMode", false);
                if (this.isEmailValid(domElement)){
                    this.set("isDesignMode", true);
                    this.set("domElement", domElement);
                } else {
                    // TODO: confirm dialog
                    // window.Dialogs.confirm("Редактирование данного сообщения/шаблона в дизайнере невозможно. Установить шаблон для дизайнера по умолчанию?", () => {
                        domElement = parseHTML(this.get("defaultTemplate"));
                        this.set("isDesignMode", true);
                        this.set("domElement", domElement);
                    // });
                }
            });
        },

        switchToEditorMode(){
            this.set("isDesignMode", false);
            this.set("domElement", null);
        },

        format(){
            this.get("codemirror").send("format");
        }
    }
});
