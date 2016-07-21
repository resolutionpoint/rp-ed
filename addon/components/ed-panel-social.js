import Ember from 'ember';
import EdPanelPaddingMixin from '../mixins/ed-panel-padding';
import ContentBlockSocialVK from '../email-designer/content-block-social-vk';
import ContentBlockSocialOK from '../email-designer/content-block-social-ok';
import ContentBlockSocialFB from '../email-designer/content-block-social-fb';
import layout from '../templates/components/ed-panel-social';
import { parseHTML } from "../email-designer/dom-utils";

export default Ember.Component.extend(EdPanelPaddingMixin, {
    layout,

    _fmtLink(url, href, tag){
        return `[@link href='${url}/${href}' tag='${tag}'/]`;
    },

    _parseTag(link){
        return (/tag=(["'])(.*?)\1/.exec(link) || {})[2];
    },

    vkChecked: Ember.computed({
        get(){
          return !this.get("domElement").getElementByClassName("ed-social-vk-placeholder");
        },
        set(key, value){
            if (value === true){
                const vkTag = parseHTML(ContentBlockSocialVK.htmlText);
                this.get("domElement").getElementByClassName("ed-social-vk-placeholder").replaceElement(vkTag);
            } else {
                this.get("vkTag").replaceElement(parseHTML('<span class="ed-social-vk-placeholder"></span>'));
            }
            return value;
        }
    }),

    vkTag: Ember.computed(function(){
        return this.get("domElement").getElementByClassName("ed-social-vk");
    }).volatile(),

    vkLinkEl: Ember.computed("vkTag", function(){
        if (Ember.isNone(this.get("domElement"))) {
            return;
        }

        return this.get("vkTag").getElementByTag("a");
    }).volatile(),

    vkHref: Ember.computed.alias("vkLinkEl.attributes.href"),

    vkLink: Ember.computed("vkLinkEl", {
        get(){
            const linkHref = this.get("vkHref");
            const href = (/href=(["'])https:\/\/vk.com\/(.*?)\1/.exec(linkHref) || {})[2];
            return href;
        },
        set(key, value, oldValue){
            const linkHref = this.get("vkHref");

            if (value !== oldValue){
                const tag = this._parseTag(linkHref);
                this.set("vkHref", this._fmtLink("https://vk.com", value, tag));
            }

            return value;
        }
    }),

    vkLinkTag: Ember.computed("vkLinkEl", {
        get(){
            const linkHref = this.get("vkHref");
            const tag = this._parseTag(linkHref);
            return tag;
        },
        set(key, value, oldValue){
            const linkHref = this.get("vkHref");

            if (value !== oldValue){
                const href = (/href=(["'])https:\/\/vk.com\/(.*?)\1/.exec(linkHref) || {})[2];
                this.set("vkHref", this._fmtLink("https://vk.com", href, value));
            }

            return value;
        }
    }),

    okChecked: Ember.computed({
        get(){
            return !this.get("domElement").getElementByClassName("ed-social-ok-placeholder");
        },
        set(key, value){
            if (value === true){
                const okTag = parseHTML(ContentBlockSocialOK.htmlText);
                this.get("domElement").getElementByClassName("ed-social-ok-placeholder").replaceElement(okTag);
            } else {
                this.get("okTag").replaceElement(parseHTML('<span class="ed-social-ok-placeholder"></span>'));
            }

            return value;
        }
    }),

    okTag: Ember.computed(function(){
        return this.get("domElement").getElementByClassName("ed-social-ok");
    }).volatile(),

    okLinkEl: Ember.computed("okTag", function(){
        if (Ember.isNone(this.get("domElement"))) {
            return;
        }

        return this.get("okTag").getElementByTag("a");
    }).volatile(),

    okHref: Ember.computed.alias("okLinkEl.attributes.href"),

    okLink: Ember.computed("okLinkEl", {
        get(){
            const linkHref = this.get("okHref");
            const href = (/href=(["'])https:\/\/ok.ru\/(.*?)\1/.exec(linkHref) || {})[2];
            return href;
        },
        set(key, value, oldValue){
            const linkHref = this.get("okHref");

            if (value !== oldValue){
                const tag = this._parseTag(linkHref);
                this.set("okHref", this._fmtLink("https://ok.ru", value, tag));
            }

            return value;
        }
    }),

    okLinkTag: Ember.computed("okLinkEl", {
        get(){
            return this._parseTag(this.get("okHref"));
        },
        set(key, value, oldValue){
            const linkHref = this.get("okHref");

            if (value !== oldValue){
                const href = (/href=(["'])https:\/\/ok.ru\/(.*?)\1/.exec(linkHref) || {})[2];
                this.set("okHref", this._fmtLink("https://ok.ru", href, value));
            }

            return value;
        }
    }),

    fbChecked: Ember.computed({
        get(){
            return !this.get("domElement").getElementByClassName("ed-social-fb-placeholder");
        },
        set(key, value){
            if (value === true){
                const fbTag = parseHTML(ContentBlockSocialFB.htmlText);
                this.get("domElement").getElementByClassName("ed-social-fb-placeholder").replaceElement(fbTag);
            } else {
                this.get("fbTag").replaceElement(parseHTML('<span class="ed-social-fb-placeholder"></span>'));
            }

            return value;
        }
    }),

    fbTag: Ember.computed(function(){
        return this.get("domElement").getElementByClassName("ed-social-fb");
    }).volatile(),

    fbLinkEl: Ember.computed("fbTag", function(){
        if (Ember.isNone(this.get("domElement"))) {
            return;
        }

        return this.get("fbTag").getElementByTag("a");
    }).volatile(),

    fbHref: Ember.computed.alias("fbLinkEl.attributes.href"),

    fbLink: Ember.computed("fbLinkEl", {
        get(){
            const linkHref = this.get("fbHref");
            return (/href=(["'])https:\/\/fb.com\/(.*?)\1/.exec(linkHref) || {})[2];
        },
        set(key, value, oldValue){
            const linkHref = this.get("fbHref");

            if (value !== oldValue){
                const tag = this._parseTag(linkHref);
                this.set("fbHref", this._fmtLink("https://fb.com", value, tag));
            }

            return value;
        }

    }),

    fbLinkTag: Ember.computed("fbLinkEl", {
        get(){
            const linkHref = this.get("fbHref");
            const tag = this._parseTag(linkHref);
            return tag;
        },
        set(key, value, oldValue){
            const linkHref = this.get("fbHref");

            if (value !== oldValue){
                const href = (/href=(["'])https:\/\/fb.com\/(.*?)\1/.exec(linkHref) || {})[2];
                this.set("fbHref", this._fmtLink("https://fb.com", href, value));
            }

            return value;
        }
    })
});
