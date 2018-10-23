const formats = {
    '%': function(val) { return '%'; },
    'b': function(val) { return parseInt(val, 10).toString(2); },
    'c': function(val) { return String.fromCharCode(parseInt(val, 10)); },
    'd': function(val) { return parseInt(val, 10) ? parseInt(val, 10) : 0; },
    'u': function(val) { return Math.abs(val); },
    'f': function(val, p) { return (p > -1) ? Math.round(parseFloat(val) * Math.pow(10, p)) / Math.pow(10, p) : parseFloat(val); },
    'o': function(val) { return parseInt(val, 10).toString(8); },
    's': function(val) { return val; },
    'S': function(val, p) { var len = p - val.toString().length; for (i = 0; i < len; i++) val = '0' + val; return val; },
    'x': function(val) { return ('' + parseInt(val, 10).toString(16)).toLowerCase(); },
    'X': function(val) { return ('' + parseInt(val, 10).toString(16)).toUpperCase(); }
};
const re = /%(?:(\d+)?(?:\.(\d+))?|\(([^)]+)\))([%bcdufosSxX])/g;
var dispatch = function(data) {
    if (data.length == 1 && typeof data[0] == 'object') {
        data = data[0];
        return function(match, w, p, lbl, fmt, off, str) {
            return formats[fmt](data[lbl]);
        };
    } else {
        var idx = 0;
        return function(match, w, p, lbl, fmt, off, str) {
            return formats[fmt](data[idx++], p);
        };
    }
};

//'%s %d% %.3f'.format('string', 40, 3.141593);
String.prototype.format = function() {
    //var argv = Array.apply(null, arguments);
    return this.replace(re, dispatch(arguments));
}

//'%s %d% %.3f'.vformat(['string', 40, 3.141593])
String.prototype.vformat = function(data) {
    return this.replace(re, dispatch(data));
}

// Array.prototype.max = function getArrayMaxValue(){ 
//     return Math.max.apply({},this) 
// } 
// Array.prototype.min = function(){ 
//     return Math.min.apply({},this) 
// } 
//[1,2,3].max()  => 3 
//[1,2,3].min()  => 1


//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
            break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
        default: 
            return 0; 
            break; 
    } 
}
function getDictCnt(dict){
    let cnt = 0;
    for (var name in dict) {
        cnt++;
    }
    return cnt;
}

// x正方向逆时针偏转角
// 保证在[0, 2*PI)以内
function toPositiveRadian(r){
    return r < 0 && (2 * Math.PI + r) || r
}

function getRadian(x, y){
 // -- 注意x,y这个函数是倒置的。。。
    let r = Math.atan2(y, x);
    return toPositiveRadian(r)
}

function radian2Degree(r){
    return 180 * r / Math.PI;
}
function getDegreeBy2Point(sx, sy, dx, dy){
    let rad = getRadian(dx-sx, dy-sy);
    return radian2Degree(rad)
}

function getDegreeByDelta(deltax, deltay){
    let rad = getRadian(deltax, deltay);
    return radian2Degree(rad)
}



module.exports = {
    randomNum,
    getDictCnt,
    getDegreeBy2Point,
    getDegreeByDelta,
};

if (typeof Object.values !== 'function') {

    Object.values = function(obj) {
        var vals = [];
        for (var key in obj) {
            vals.push(obj[key]);
        }
        return vals;
    }

}