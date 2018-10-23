function loadSpriteFrame(node, framePath, keepOldSize) {
	node.active = false;
	cc.loader.loadRes(framePath, cc.SpriteFrame, (err, spriteFrame) => {
		if (!cc.isValid(node) || err) {
			return;
		}
		let width = node.width;
		let height = node.height;
		node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
		node.active = true;
		if (keepOldSize) {
			node.width = width;
			node.height = height;
		}
	});
}
function getChildByNameArray(array, node, comp) {
	let child = cc.find(array.join('/'), node);
	if (!!comp) {
		child = child.getComponent(comp);
	}
	return child;
}
function addOnlyTouchEvent(target, eventType, cb, context) {
	let fnName = 'fn_' + eventType;
	if (!!target[fnName]) {
		target.off(eventType, target[fnName], context);
	}
	target[fnName] = cb
	target.on(eventType, target[fnName], context);
}
module.exports = {
	"loadSpriteFrame": loadSpriteFrame,
	"getChildByNameArray": getChildByNameArray,
	"addOnlyTouchEvent": addOnlyTouchEvent,
};