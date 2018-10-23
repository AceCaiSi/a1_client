function getDesignResolution()
{
	return cc.view.getDesignResolutionSize();
}

function getVisibleSize()
{
	return cc.view.getVisibleSize();
}

function getVisibleOrigin(){
	return cc.view.getVisibleOrigin();
}


function getEffectiveSize()
{
	return getVisibleSize();
}

function getEffectiveOrigin()
{
	return cc.view.getVisibleOrigin();
}

var WIDE_SCEEN_RATE = 16/9.0
var MID_SCEEN_RATE = 3/2.0
var NARROW_SCEEN_RATE = 4/3.0

//note:
//iPad 1代、iPad 2代和iPad Mini的分辨率：1024 x 768
//iPad 3代和iPad 4代的分辨率（Retina屏幕）：2048 x 1536
//iPhone 1代，iPhone3G，iPhone 3GS的分辨率：480 x 320
//iPhone 4，iPhone 4S的分辨率：960 x 640
//iPhone 5的分辨率：1136 x 640
//iPhone 5s，iPhone 5c的分辨率：1136 x 640

//1.宽屏16:9 > 5:3 > 3:2 > 4:3 (1.77>1.66>1.5>1.33)
//2.1136:640（ip5）, 960:640(ip4s)
//3.保持640宽，且16:9的分辨率时，高是1137.77777，1136约为两段各减少一个像素

//分辨率策略：
//1.16:9到3:2之间分辨率为640*1136, 3:2到4:3之间为720*960, 都无黑边。 超过此范围取临近分辨率，有黑边。
//2.可认为最小可视范围为960*640，界面布局要以此为参考
function setDesignResolution()
{
	console.log("~~~~~~",desingW, desingH, policy)
	var desingW, desingH, policy
	var frameSize = cc.view.getFrameSize();
	var ratio = frameSize.height / frameSize.width;
	if (ratio < 1){
		ratio = 1.0/ratio;
	}
	if (ratio < NARROW_SCEEN_RATE) {
		desingW = 720, desingH = 960, policy = cc.ResolutionPolicy.SHOW_ALL;
	}
	else if (ratio < MID_SCEEN_RATE) {
		desingW = 720, desingH = 960, policy = cc.ResolutionPolicy.NO_BORDER;
	}
	else if (ratio <= WIDE_SCEEN_RATE) {
		desingW = 640, desingH = 1136, policy = cc.ResolutionPolicy.NO_BORDER;
	}
	else {
		desingW = 640, desingH = 1136, policy = cc.ResolutionPolicy.SHOW_ALL;
	}
	cc.log(desingW, desingH, policy)
	cc.view.setDesignResolutionSize(desingW, desingH, policy)
}

function getViewPos( posDesc ){
	var effSize = getEffectiveSize();
	var effOri = getEffectiveOrigin();
	var conf = COMMON_CONST.UI_POS_CONF[posDesc];
	var x = effOri.x + effSize.width * conf[0];
	var y = effOri.y + effSize.height* conf[1];
	return new cc.Vec2(x,y);
}

module.exports = {
	"getViewPos":getViewPos,
	"setDesignResolution":setDesignResolution,
	"getDesignResolution":getDesignResolution,
	"getEffectiveSize":getEffectiveSize,
};