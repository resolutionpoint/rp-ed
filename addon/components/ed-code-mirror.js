import Ember from 'ember';

export default Ember.TextArea.extend({
    editor : null,
    readonly : false,
    value : "",

    didInsertElement() {
        const cm = window.CodeMirror.fromTextArea(this.$()[0], {
            // lineNumbers: true,
            lineWrapping: true,
            readOnly: this.get("readonly") ? "nocursor" : false,
            styleActiveLine: true,
            continueComments: true,
            highlightSelectionMatches: true,
            matchBrackets: true,
            mode: "application/xml"
        });

        this.set("editor", cm);

        cm.setSize("100%", "100%");

        this._lsnr = Ember.$.proxy(this._editorValueChanged, this);
        cm.on("change", this._lsnr);
    },

    willDestroyElement() {
        const codemirror = this.get("editor");
        codemirror.off("change", this._lsnr);
        codemirror.toTextArea();
        this.set("editor", null);
    },

    suspendValueChange(cb) {
        this._suspendValueChange = true;
        cb();
        this._suspendValueChange = false;
    },

    _editorValueChanged(editor) {
        const that = this;
        that.suspendValueChange(function() {
            that.set("value", editor.getValue());
        });
    },

    valueChanged: Ember.observer("value", function() {
        if (this._suspendValueChange) {
            return;
        }

        const content = this.get("value");
        this.get("editor").setValue(content||"");
    }),

    _register: Ember.on("didUpdateAttrs", function() {
        this.set("register-as", this);
    }),

    actions: {
        format() {
            const totalLines = this.get("editor").lineCount();
            this.get("editor").autoFormatRange({line:0, ch:0}, {line:totalLines});
        }
    }
});
