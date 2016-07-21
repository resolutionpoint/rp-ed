/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var BroccoliMergeTrees = require('broccoli-merge-trees');
var path = require("path");

module.exports = {
    name: 'ember-cli-email-designer',

    included: function(app) {
        if (typeof app.import !== "function") {
            app = app.app;
        }

        this._super.included(app);

        app.import(app.bowerDirectory + '/codemirror/lib/codemirror.css');
        app.import(app.bowerDirectory + '/codemirror/lib/codemirror.js');

        app.import(app.bowerDirectory + '/codemirror/mode/xml/xml.js');
        app.import('vendor/codemirror-formatting.js')

        var colpickPath = path.join(app.bowerDirectory, 'colpick');
        this.app.import(path.join(colpickPath, 'js',  'colpick.js'));
        this.app.import(path.join(colpickPath, 'css', 'colpick.css'));
    },

    treeForPublic: function(tree) {
        var publicFiles =  new Funnel(tree, {
            srcDir: '/',
            destDir: 'assets/' + this.moduleName()
        });

        return new BroccoliMergeTrees([publicFiles]);
    }
};
