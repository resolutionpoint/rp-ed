import Ember from 'ember';
import layout from '../templates/components/ed-panel-link-tag';


export default Ember.Component.extend({
    layout,

    linkTypes: Ember.A([{
        id: "link",
        name: "Ссылка"
    }, {
        id: "survey",
        name: "Опрос"
    }, {
        id: "unsubscribe",
        name: "Отписаться"
    }, {
        id: "resubscribe",
        name: "Возобновить подписку"
    }]),

    typesRegex: /\[@(link|survey|unsubscribe|resubscribe)/,

    _linkType: null,
    linkType: Ember.computed("link", {
        get(){
            const parsedType = (this.get("typesRegex").exec(this.get("link")) || {})[1];
            return this.get("linkTypes").findBy("id", parsedType || "link");
        },
        set(key, value, oldValue){
            if (value !== oldValue) {
                if (!Ember.isNone(value) && ["survey", "unsubscribe", "resubscribe"].contains(Ember.get(value, 'id'))) {
                    this.set("link", `[@${Ember.get(value, "id")} /]`);
                } else {
                    this.set("link", "");
                }
            }

            return value;
        }
    }),

    isLink: Ember.computed.equal("linkType.id", "link"),
    isSurvey: Ember.computed.equal("linkType.id", "survey"),
    isUnsubscribe: Ember.computed.equal("linkType.id", "unsubscribe"),
    isResubscribe: Ember.computed.equal("linkType.id", "resubscribe"),

    suvery: null,
    surveyId: Ember.computed("link", {
        get(){
            return  (/\[@survey\s+(\d+)/.exec(this.get("link")) || {})[1] || null;
        },
        set(key, value, oldValue){
            if (value !== oldValue) {
                this.set("link", `[@survey ${value} /]`);
            }
            return value;
        }
    }),

    href: Ember.computed("link", {
        get(){
            const hrefLink = this.get("link");

            return /^\[@link/.test(hrefLink) ?
                (/href=(["'])(.*?)\1/.exec(hrefLink) || {})[2] :
                hrefLink;
        },
        set(key, value, oldValue){
            const hrefLink = this.get("link");
            let href, tag;

            if (value !== oldValue) {
                tag = (/tag=(["'])(.*?)\1/.exec(hrefLink) || {})[2];
                href = value;
                if (Ember.isBlank(tag)){
                    this.set("link", href);
                } else {
                    this.set("link", `[@link href='${href}' tag='${tag}' /]`);
                }
            }

            return value;
        }
    }),

    tag: Ember.computed("link", {
        get(){
            const hrefLink = this.get("link");
            return (/tag=(["'])(.*?)\1/.exec(hrefLink) || {})[2];
        },
        set(key, value, oldValue){
            const hrefLink = this.get("link");
            let href, tag;

            if (value !== oldValue) {
                tag = value;
                if (/\[@link/.test(hrefLink)) {
                    href = (/href=(["'])(.*?)\1/.exec(hrefLink) || {})[2];
                } else {
                    href = hrefLink;
                }

                if (!Ember.isBlank(tag)) {
                    this.set("link", `[@link href='${href}' tag='${tag}' /]`);
                } else {
                    this.set("link", href);
                }
            }

            return value;
        }
    })
});
