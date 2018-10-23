function initClient(rootNode) {
	MOD.resolution.setDesignResolution();
	MOD.gameNode.init(rootNode);
	MOD.panel.create('loginPanel');
}

function run(rootNode)
{
	initClient(rootNode);
}

module.exports = {
	"run":run,
};

