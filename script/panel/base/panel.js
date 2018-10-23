var clsPanel = cc.Class({
	name: "panel", //fix：如果不设定name，会有报错
	extends: cc.Node,

	ctor: function() {
		var panelConf = arguments[0];
		this._panelConf = panelConf;
		MOD.uiLoader.loadRes(panelConf.prefab, cc.Prefab, (prefab) => {
			if (!cc.isValid(this)) {
				return;
			}
			let ccnode = MOD.uiLoader.instantiate(prefab);
			this.addChild(ccnode);
			this.prefabRoot = ccnode;

			this.adaptPanel();

			if (panelConf.modalMask) {
				this.prefabRoot.addComponent(MOD.modalMask);
				let mask = this.addComponent(MOD.modalMask);
				mask.setTouchCloseEnabled(true);
			}
			if(panelConf.isTouchClose) {
			    MOD.uiFunclib.addOnlyTouchEvent(this.prefabRoot, cc.Node.EventType.TOUCH_END, () => {
					this.releaseSelf();
				});
			}

			this.isPanelReady = true;
			
			let args = arguments[1];
			this.init(args);
		});
		if (panelConf.isGrey) {
			this.greyNode = new cc.Node();
			this.greyNode.parent = this;
			this.greyNode.zIndex = -2;
			this.greyNode.color = new cc.color(0,0,0,255);
			this.greyNode.opacity = 180;
			this.greyNode.scale = 1000;
			let greyNode = this.greyNode.addComponent(cc.Sprite);
			MOD.uiFunclib.loadSpriteFrame(this.greyNode,'ui/singleColor');
		}
	},

	init: function() {
		this.regBtn();
	},

	adaptPanel: function() {
		let adapter = this.getComponent(MOD.panelAdapter);
		if (!adapter) {
			this.addComponent(MOD.panelAdapter);
		} else {
			adapter.tryAdaptPanel();
		}
	},
	releaseSelf:function () {
		MOD.panel.close(this.panelName);
	},

	getChildByNameArray: function(array, node, comp) {
		node = !node ? this.prefabRoot : node;
		if (array.length === 0 || !node) {
			return null;
		}
		return MOD.uiFunclib.getChildByNameArray(array, node, comp);
	},

	getBtnConf: function() {
		return {};
	},

	regBtn: function() {
		var btnConf = this.getBtnConf();
		for (let btnName in btnConf) {
			let btn
			let conf = btnConf[btnName];
			if (!!conf.widgetPath) {
				btn = this.getChildByNameArray(conf.widgetPath);
			} else {
				btn = this.prefabRoot.getChildByName(btnName);
			}
			if (!!btn) {
				if (!!conf.onClick) {
					btn.on('click', () => {
						MOD.funclib.invokeCallback(conf.onClick.bind(this));
						// MOD.audioMgr.playEffect('button');
					}, this);
				}
				if (!!conf.onTouchUp) {
					btn.on(cc.Node.EventType.TOUCH_END, () => {
						MOD.funclib.invokeCallback(conf.onTouchUp.bind(this));
						// MOD.audioMgr.playEffect('button');
					}, this);
				}
				if (!!conf.onTouchMove) {
					btn.on(cc.Node.EventType.TOUCH_MOVE, conf.onTouchMove, this);
				}
				if (!!conf.onTouchDown) {
					btn.on(cc.Node.EventType.TOUCH_START, conf.onTouchDown, this);
				}
				if (!!conf.onTouchCancel) {
					btn.on(cc.Node.EventType.TOUCH_CANCEL, conf.onTouchCancel, this);
				}
			}
		}
	},

	_onPreDestroy: function() {
		this._super();
		MOD.uiLoader.releaseRes(this._panelConf.prefab, cc.Prefab);
		// MOD.hook.delHook('canvas-resize', 'panel-base');
	}
});

var modConf = {
	["loginPanel"]: {
		prefab: 'template/login_panel',
		modalMask: true,
	},
	["fightPanel"]: {
		prefab: 'template/fight_panel',
		modalMask: true,
	},
};

var panelCache = {};
function create(modName, parent, args) {
	if (!panelCache[modName]) {
		panelCache[modName] = [];
	}
	if (getPanel(modName)){
		return;
	}
	if (!parent) {
		parent = MOD.gameNode.getUiNode(COMMON_CONST.LAYER_PANEL);
	}
	var panelConf = modConf[modName];
	var clsPanel = MOD[modName].clsPanel;
	var panel = new clsPanel(panelConf, args);
	cc.log("----panelName----",modName);
	cc.log("----panelConf----",panelConf);
	panel.panelName = modName;
	parent.addChild(panel);

	panelCache[modName].push(panel);
	return panel;
}

let stackPanel = [];
function onStackRelease(){
	let args = stackPanel[0];
	if (args){
		stackPanel.shift();
	}
	args = stackPanel[0];
	if (args){
		stackCreatePanel(...Array.prototype.slice.call(args, 0));
	}
}
function stackCreatePanel() {
	let panel = create(...Array.prototype.slice.call(arguments, 0));
	panel.isStackPanel = true;
	return panel;
}
function stackCreate() {
	let isSamePanel = false;
	// for (var i = 0; i < stackPanel.length; i++) {
	// 	if (stackPanel[i][0] === arguments[0]){
	// 		isSamePanel = true;
	// 		break;
	// 	}
	// }
	if (!isSamePanel) {
		if (stackPanel.length === 0 ){
			stackCreatePanel(...Array.prototype.slice.call(arguments, 0));
		}
		stackPanel.push(arguments);
	}
}
	
function releasePanelLayer() {
	// 关闭全部LAYER_PANEL层的界面
	let comParent = MOD.gameNode.getUiNode(COMMON_CONST.LAYER_PANEL);
	for (var modName in panelCache) {
		let modPanelList = panelCache[modName]
		if (!!modPanelList){
			for (var i = 0; i < modPanelList.length; i++) {
				let parent = modPanelList[i].parent;
			    if (parent && parent === comParent){
			    	closeImmediate(modName);
			    	break;
			    }
			}
		}
	}
}

function releaseImmediate(panel) {
	if (cc.isValid(panel)) {
		MOD.uiLoader.destroy(panel);
	}
}

function releaseAnimated(panel) {
	if (cc.isValid(panel) && panel.isPanelReady) {
		let transitionComp = panel.getComponent(MOD.panelTransition);
		if (!!transitionComp) {
			transitionComp.close();
		}
	}
}

function closeImmediate(modName) {
	let panels = panelCache[modName];
	if (!!panels && panels.length > 0) {
		let panel = panels.pop();
		releaseImmediate(panel);
	}
	if (!!panels && panels.length === 0) {
		delete panelCache[modName];
	}
}

function close(modName) {
	var panelConf = modConf[modName];
	let panels = panelCache[modName];
	let isStackPanel = false;
	if (!!panels && panels.length > 0) {
		let panel = panels.pop();
		if (!panelConf.animate) {
			releaseImmediate(panel);
		} else {
			releaseAnimated(panel);
		}
		isStackPanel = panel.isStackPanel;
	}
	if (!!panels && panels.length === 0) {
		delete panelCache[modName];
	}
	// MOD.hook.doHook(HOOK_TYPE.PANEL_RELEASE,modName);
	if (isStackPanel) {
		onStackRelease();
	}
}

function closeAll()
{
	for (let name in panelCache) {
		let panels = panelCache[name];
		for (let i = 0; i < panels.length; i++) {
			MOD.uiLoader.destroy(panels[i]);
		}
	}
	panelCache = {};
}

function getPanel(modName) {
	let panels = panelCache[modName];
	if (!!panels && panels.length > 0) {
		return panels[panels.length - 1];
	}
	return null;
}

module.exports = {
	"clsPanel": clsPanel,
	"create": create,
	"close": close,
	"getPanel": getPanel,
	"closeAll": closeAll,
	stackCreate,
	closeImmediate,
	releaseImmediate,
	releasePanelLayer,
};