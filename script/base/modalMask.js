cc.Class({
	extends: cc.Component,

	onEnable: function() {
		this.node.on('touchstart', this._onTouchBegan, this);
		this.node.on('touchend', this._onTouchEnded, this);
	},

	onDisable: function() {
		this.node.off('touchstart', this._onTouchBegan, this);
		this.node.off('touchend', this._onTouchEnded, this);
	},

	_onTouchEnded: function(event) {
		event.stopPropagation();
		if (this._enabledTouchClose) {
			this.node.releaseSelf();
		}
	},

	_onTouchBegan: function(event) {
		event.stopPropagation();
	},

	setTouchCloseEnabled: function(enabled) {
		this._enabledTouchClose = enabled;
	},
});
