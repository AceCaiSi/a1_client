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
		return {
			loginBtn: {
				widgetPath: ['PanelAdaptMiddleBottom','loginButton'],
				onTouchUp: function() {
					// this.releaseSelf();
					let accountEditBox = this.getChildByNameArray(['PanelAdaptMiddleBottom','accountEditBox'], null, cc.EditBox)
					cc.log("test~~~~~",accountEditBox.string)
					if(accountEditBox.string&&accountEditBox.string!=""){
						MOD.netWork.connect("192.168.0.100","3000")
					}
				}
			},
		};
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