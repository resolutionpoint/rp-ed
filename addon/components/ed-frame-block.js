import Ember from 'ember';
import MouseInMixin from '../mixins/mouse-in';
import StructureHighlightMixin from '../mixins/structure-highlight';
import layout from '../templates/components/ed-frame-block';

const EdColumnPair = Ember.Object.extend({
	leftColumn: null,
	rightColumn: null,

	_left: null,
	left: Ember.computed("_left", {
		get(){
            return this.get("_left");
        },
        set(key, value){
            const oldLeft = this.get("_left");
            const newLeft = value;

            if (!Ember.isNone(oldLeft)){

                const l = parseFloat(this.get("leftColumn.attributes.width"));
                const r = parseFloat(this.get("rightColumn.attributes.width"));

                const dif = Math.abs(newLeft - oldLeft);

                if (newLeft > oldLeft) {
                    this.set("leftColumn.attributes.width", (l + dif) + "%");
                    this.set("rightColumn.attributes.width", (r - dif) + "%");
                } else {
                    this.set("leftColumn.attributes.width", (l - dif) + "%");
                    this.set("rightColumn.attributes.width", (r + dif) + "%");
                }
            }
            this.set("_left", newLeft);

            return newLeft;
        }
	}),

	style: Ember.computed("width", "left", function(){
		return Ember.String.htmlSafe("position:absolute; left: " + this.get("left") + "%;");
	})
});

export default Ember.Component.extend(MouseInMixin, StructureHighlightMixin, {
    layout,

	isShowHighlight: Ember.computed.alias("isShowFrameBlockPanel"),

	isShowFrameBlockPanel: Ember.computed("edState.isHighlightMode", "isMouseIn", "domElement.parentFrame.isBody", function(){
		return this.get("edState.isHighlightMode") && this.get("isMouseIn") && this.get("domElement.parentFrame.isBody");
	}),

	mouseMove(event){
		if ( this.get("isEdit") && this.get("isResizeColumn")) {
			const offset = this.$(".ed-resizer").offsetParent().offset();

			const x = event.pageX - offset.left;

			this.set("resizedColumnPair.left", x / (this.get("edState.bodyComponent.bodyWidth") / 100));
		} else {
			this._super.call(this, event);
		}
	},

	mouseUp(){
		this.set("isResizeColumn", false);
		this.set("resizedColumnPair", null);
	},

	styleCenterBlock:  Ember.computed("isEdit", function(){
		if (this.get("isEdit")){
			return Ember.String.htmlSafe("position:relative");
		}
	}),

	columns: Ember.computed.alias("edState.editElement.children.0.children.0.children"),

	columnPairs: Ember.computed("columns.length", function(){
		let prevColumn;
		let sum = 0;
		if (Ember.isNone(this.get("columns.length"))) {
			return Ember.A();
		}

		return this.get("columns").reduce((pairs, column) => {
			if (prevColumn){
				sum += parseFloat(prevColumn.get("attributes.width"));
				pairs.pushObject(EdColumnPair.create({
					leftColumn: prevColumn,
					rightColumn: column,
					left: sum
				}));
			}

			prevColumn = column;

			return pairs;
		}, Ember.A());
	}),

	bgColor: Ember.computed("editElement.attributes.bgcolor", "editElement.style.background-color", {
        get(){
    		return this.get("editElement.attributes.bgcolor") || "";
        },
        set(key, value){
            this.set("editElement.style.background-color", value);
            this.set("editElement.attributes.bgcolor", value);

            return this.get("editElement.attributes.bgcolor") || "";
        }
	}),

	actions: {
		moveFrameBlock(){
			this.get("edState").beginDragElement(this.get("domElement"));
		},

		editFrameBlock(){
			this.set("isEdit", true);
			this.set("editElement", this.get("domElement").cloneNode());
			this.set("edState.editComponent", this);

			this.get("edState").beginEditElement(this.get("editElement"), (success, editElement) => {
				if (success) {
					this.get("domElement").replaceElement(editElement);
					this.set("domElement", editElement);
				}

				this.set("isEdit", false);
			});
		},

		cloneFrameBlock(){
			const clone = this.get("domElement").cloneNode();

			this.get("domElement").insertAfter(clone);
		},

		removeFrameBlock(){
			if (this.get("domElement.parentFrame.isBody") && this.get("domElement.parentFrame.childrenFrame.children.length") === 1){
				this.get("domElement").replaceElement(this.get("edState").createPlaceholder());
			} else {
				this.get("domElement").removeElement();
			}
		},

		resizeColumn(pair){
			this.set("isResizeColumn", true);
			this.set("resizedColumnPair", pair);
		},

		inserted(){
			this.set("isMouseIn", false);
		}
	}
});
