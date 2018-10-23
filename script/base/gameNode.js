var layoutTbl = [];
function initUiLayout(uiRootNode){
	var UI_ZORDER_CONF = [];
	UI_ZORDER_CONF[COMMON_CONST.LAYER_SCENE] = 1000;
	UI_ZORDER_CONF[COMMON_CONST.LAYER_MAIN_UI] = 1001;
	UI_ZORDER_CONF[COMMON_CONST.LAYER_PANEL] = 1002;
	UI_ZORDER_CONF[COMMON_CONST.LAYER_TOP_PANEL] = 1003;
	for (var name in UI_ZORDER_CONF)
	{
		var zorder = UI_ZORDER_CONF[name]
		var layoutNode = new cc.Node();
		layoutNode.setPosition(0,0);
		layoutNode.zIndex = zorder;
		layoutTbl[name] = layoutNode;
		uiRootNode.addChild(layoutNode);

		layoutNode._tbl9Node = [];
		for (var posDes in COMMON_CONST.UI_POS_CONF)
		{
			var posNode = new cc.Node();
			layoutNode.addChild(posNode);
			layoutNode._tbl9Node[posDes] = posNode;
			var pos = MOD.resolution.getViewPos(posDes);
			posNode.x = pos.x;
			posNode.y = pos.y;
		}
	}
}

var rootNode = null;
var sceneRootNode = null;
var uiRootNode = null;

var init = function(_rootNode) {
	rootNode = _rootNode;
	sceneRootNode = new cc.Node();
	rootNode.addChild(sceneRootNode);
	uiRootNode = new cc.Node();
	rootNode.addChild(uiRootNode);
	initUiLayout(uiRootNode)
}
var getRootNode = function() {
	return rootNode;
}

var getUiRootNode = function() {
	return uiRootNode;
}

var getSceneRootNode = function() {
	return sceneRootNode;
}


function clearAllLayout()
{
	for (var name in layoutTbl)
	{
		var obj = layoutTbl[name];
		obj.destroy();
	}	
	layoutTbl = [];
}

function getUiZNode(zorderName)
{
	return layoutTbl[zorderName]
}

function getUiNode(zorderName, posDes)
{
	if (undefined == posDes){
		posDes = COMMON_CONST.POSITION.CENTER;
	}
	return layoutTbl[zorderName]._tbl9Node[posDes];
}

module.exports = {
	"init":init,
	"getRootNode":getRootNode,
	"getSceneRootNode":getSceneRootNode,
	"getUiRootNode":getUiRootNode,
	"getUiNode":getUiNode,
	"getUiZNode":getUiZNode,
};