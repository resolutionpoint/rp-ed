import Ember from 'ember';

export default Ember.Mixin.create({
	mouseEnter(){
		this.set("isMouseIn", true);
	},

	mouseLeave(){
		this.set("isMouseIn", false);
	}
});
