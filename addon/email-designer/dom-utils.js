import Ember from 'ember';
import DomElement from './dom-element';
import EdAttributesObject from './ed-attributes-object';

const _aggregateDOM = (element, parent) => {
    const root = {};

    const stack = [{
        element: element,
        parent: parent
    }];

    let domElement = root;
    while (stack.length !== 0){
        const item = stack.shift();

        domElement.parent = item.parent;

        if (item.parent){
            item.parent.children.push(domElement);
        }

        const el = item.element;

        if (el.nodeType === 1){
            domElement.type = "tag";
            domElement.name = el.tagName.toLowerCase();
            domElement.attributes = {};
            domElement.children = [];

            [].slice.call(el.attributes).forEach(attr => {
                domElement.attributes[attr.name] = attr.value;
            });

            [].slice.call(el.childNodes).forEach(child => {
                stack.push({
                    parent: domElement,
                    element: child
                });
            });
        }

        if (el.nodeType === 3){
            domElement.type = "text";
            domElement.data = el.data;
        }

        if (el.nodeType === 8) {
            domElement.type = "comment";
            domElement.data = el.data;
        }

        domElement = {};
    }

    return root;
};

const structurify = (element, parent) => {
    const root = DomElement.create({});

    const stack = Ember.A([{
        element: element,
        parent: parent
    }]);

    let domElement = root;
    while (stack.length !== 0){
        const newStackItems = _structurifyElement(stack.shift(), domElement);

        stack.pushObjects(newStackItems);

        domElement = DomElement.create({});
    }

    return root;
};

const _structurifyElement = (item, domElement) => {
    const stack = [];
    const el = item.element;

    if (item.parent){
        item.parent.get("children").push(domElement);
    }

    const obj = Ember.merge({}, el);
    obj.parent = item.parent;

    if (el.type === "tag"){
        const classes = Ember.A((el.attributes.class || "").split(" "));

        if (classes.contains("ed-background")){
            obj.isBackground = true;
        } else if (classes.contains("ed-body")){
            obj.isBody = true;
        } else if (classes.contains("ed-frame-block")){
            obj.isFrameBlock = true;
        } else if (classes.contains("ed-placeholder")){
            obj.isPlaceholder = true;
        }

        obj.attributes = EdAttributesObject.create();
        obj.children = [];

        Object.keys(el.attributes || {}).forEach(attrName => {
            obj.attributes.set(attrName, el.attributes[attrName]);
        });

        (el.children || []).forEach(child => {
            stack.push({
                parent: domElement,
                element: child
            });
        });
    }

    domElement.setProperties(obj);

    return stack;
};

const asyncStructurify = (element, callback) => {
    function workOnStack(stack, domElement){
        if (stack.length === 0){
            Ember.run.next(function(){
                callback(root);
            });
        } else {
            const startTick = +(new Date());
            const newStackItems = _structurifyElement(stack.shift(), domElement);
            const stopTick = +(new Date());

            const workOnStackCall = workOnStack.bind(null, stack.concat(newStackItems), DomElement.create({}));

            if (stopTick - startTick >= 16) {
                Ember.run.next(workOnStackCall);
            } else {
                workOnStackCall();
            }
        }
    }

    const root = DomElement.create({});
    workOnStack([{ element: element, parent: null }], root);
};


export const parseHTML = (html) => {
    const el = document.createElement('div');
    el.innerHTML = html;

    if (Ember.isNone(el.childNodes[0])) {
        return null;
    }

    const domized = _aggregateDOM(el.childNodes[0]);
    const structured = structurify(domized);

    return structured;
};

export const asyncParseHTML = (html, callback) => {
    const el = document.createElement('div');
    el.innerHTML = html;

    if (Ember.isNone(el.childNodes[0])) {
        callback(null);
        return null;
    }

    const domized = _aggregateDOM(el.childNodes[0]);

    asyncStructurify(domized, structured => {
        callback(structured);
    });
};
