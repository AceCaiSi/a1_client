const Conf = {
//--------------------------------------------------
LAYER_SCENE:0,	//主界面以下：地图等
LAYER_MAIN_UI:1,	//主界面：按钮，头像等
LAYER_PANEL:2,	//游戏界面等
LAYER_TOP_PANEL:3,	//游戏界面以上1层：高于普通游戏界面，比如tips, 系统消息

POSITION:{
	BOTTOMRIGHT:0,
	BOTTOMLEFT:1,
	TOPLEFT:2,
	TOPRIGHT:3,
	BOTTOM:4,
	LEFT:5,
	TOP:6,
	RIGHT:7,	
	CENTER:8, 
},

UI_POS_CONF:[]
}


function __init__(){
	Conf.UI_POS_CONF[Conf.POSITION.BOTTOMRIGHT]=[0.5,-0.5];
	Conf.UI_POS_CONF[Conf.POSITION.BOTTOMLEFT]=[-0.5,-0.5];
	Conf.UI_POS_CONF[Conf.POSITION.TOPLEFT]=[-0.5,0.5];
	Conf.UI_POS_CONF[Conf.POSITION.TOPRIGHT]=[0.5,0.5];
	Conf.UI_POS_CONF[Conf.POSITION.BOTTOM]=[0,-0.5];
	Conf.UI_POS_CONF[Conf.POSITION.LEFT]=[-0.5,0];
	Conf.UI_POS_CONF[Conf.POSITION.TOP]=[0,0.5];
	Conf.UI_POS_CONF[Conf.POSITION.RIGHT]=[0.5,0];
	Conf.UI_POS_CONF[Conf.POSITION.CENTER]=[0,0];
	window.COMMON_CONST = Conf;
}

module.exports = {
	"__init__":__init__,
}