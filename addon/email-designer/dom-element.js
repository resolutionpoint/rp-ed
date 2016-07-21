import Ember from 'ember';
import DomElementClassesMixin from '../mixins/dom-element-classes';
import EdStyleObject from '../email-designer/ed-style-object';
import EdAttributesObject from '../email-designer/ed-attributes-object';

const DomElement = Ember.Object.extend(DomElementClassesMixin, {
    name: null,
    type: null,
    raw: null, // not used
    attributes: null,
    children: null,

    style: Ember.computed("attributes", function() {
        return EdStyleObject.create({ _attributes: this.get("attributes") });
    }),

    parentFrame: Ember.computed("parent.parentFrame", function(){
        if (this.get("parent.name") === "table") {
            return this.get("parent");
        }

        return this.get("parent.parentFrame");
    }),


    childrenFrame: Ember.computed("children.@each.childrenFrame", function() {
        if (this.get("name") === "td") {
            return this;
        }

        return Ember.A(Ember.A(this.get("children")).filterBy("type", "tag")).get("firstObject.childrenFrame");
    }),

    innerHTML: Ember.computed("children.@each.html", function(){
        return Ember.A(this.get("children") || []).mapBy("html").join("");
    }),

    html: Ember.computed("type", "data", "name", "innerHTML", "attributes.html", function(){
        if (this.get("type") === "text") {
            return this.get("data");
        }

        if (this.get("type") === "comment") {
            return `<!--${this.get("data")}-->`;
        }

        if (Ember.A(["img", "br"]).contains(this.get("name"))) {
            return `<${this.get("name")}${this.get("attributes.html")}/>`;
        }

        return `<${this.get("name")}${this.get("attributes.html")}>${this.get("innerHTML")}</${this.get("name")}>`;
    }),

    classes: Ember.computed("attributes.class", function(){
        return (this.get("attributes.class") || "").split(" ");
    }),

    replaceElement(el){
        const children = this.get("parent.children"),
            idx = (children || []).indexOf(this),
            parent = this.get("parent");

        this.removeElement();
        el.removeElement();

        children.insertAt(idx, el);
        el.set("parent", parent);
    },

    insertAfter(el){
        const children = this.get("parent.children"),
            idx = (children || []).indexOf(this);

        children.insertAt(idx + 1, el);
        el.set("parent", this.get("parent"));
    },

    removeElement(){
        const children = this.get("parent.children"),
            idx = (children || []).indexOf(this);

        this.set("parent", null);

        if (idx !== -1 ){
            children.removeAt(idx);
        }
    },

    append(el){
        const children = this.get("children");

        el.set("parent", this);
        children.pushObject(el);
    },

    cloneNode(){
        const root = DomElement.create();

        Object.keys(this).forEach( key => {
            let value;

            if (key === "parent" || key === "toString") {
                return;
            } else if (key === "attributes") {
                const attrs = this.get("attributes");

                value = EdAttributesObject.create();

                Object.keys(this.get("attributes")).forEach(key => {
                    value.set(key || "style", attrs.get(key));
                });
            } else if (key === "children"){
                value = Ember.A(this.get(key).map(child => {
                    const clonedNode = child.cloneNode();
                    clonedNode.set("parent", root);
                    return clonedNode;
                }));
            } else {
                value = this.get(key);
            }

            root.set(key, value);
        });

        return root;
    },

    getElementByClassName(className){
        const a = [];

        let el = this;
        while (el){
            const hasClass = (el.get("attributes.class") || "")
                .split(" ")
                .some(elClassName => elClassName === className);

            if (hasClass) {
                break;
            }

            a.push(...(el.get("children") || []));

            el = a.shift();
        }

        return el;
    },

    getElementByTag(tag){
        const a = [];

        let el = this;
        while (el){
            if (el.name === tag){
                break;
            }
            a.push(...(el.get("children") || []));

            el = a.shift();
        }

        return el;
    },

    _isBasicComponentName(klass){
        return Ember.A(["ed-background", "ed-body", "ed-frame-block", "ed-placeholder"]).contains(klass);
    },

    _isContentComponentName(klass){
        return /^ed-content-block-/.test(klass);
    },

    contentBlockType: Ember.computed("componentName", function(){
        if (this.get("componentName") === "ed-frame-block") {
            return "frame";
        }

        return (/^ed-content-block-([\w|-]*)/.exec(this.get("componentName")) || [])[1];
    }),

    componentName: Ember.computed("classes.@each", function(){
        return Ember.A(this.get("classes").filter(klass => {
            return this._isBasicComponentName(klass) || this._isContentComponentName(klass);
        })).get("firstObject") || "ed-dom-element";
    })
});

export default DomElement;
