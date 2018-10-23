var conf = [
	"util",
	"uiLoader",
	"const",
	"resolution",
	"funclib",
	"uiFunclib",
	"gameNode",

	"netWork",
	"panel",
	"modalMask",
	"panelAdapter",

	"gameMain",
	// "hook",

	//panel
	"loginPanel",
	"fightPanel",
];
window.MOD = [];
function loadMod(modName) {
	var newMod = require(modName);
	if (newMod){
		if (newMod.__init__) {
			newMod.__init__();
		}
		window.MOD[modName] = newMod;
	}

}
function init() {
	for(var i = 0,len = conf.length; i < len; i++){
	    loadMod(conf[i])
	}

}
init();
