var clsPanel = cc.Class({
	extends: MOD.panel.clsPanel,
	init: function () {	
		this._super();
		let args = arguments[0]
		this.initPanel();
	},

	initPanel: function () {
	},

	getBtnConf: function() {
	},

	_onPreDestroy: function()
	{
		this._super();
	},
});
function __init__()
{
}
module.exports = {
	"clsPanel":clsPanel,
};