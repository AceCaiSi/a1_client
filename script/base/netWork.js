let socket
let connectting
function waitConnet() {
	// body...
	connectting = true;
}
function connect(ip,port,cbFunc) {
	// body...
    // let socket = io.connect("http://localhost:3000")
    if(!!socket&&socket.disconnected){
    	socket.destroy();
    	socket = null;
    }
    cc.log("connect:","%s:%s".format(ip,port))
    socket = io.connect("%s:%s".format(ip,port))
    waitConnet()
    socket.on('connect_result',(data)=>{
    	connectting = false;
    	cc.log("connect succes",data);
		socket.on('dataBack',function(paramTbl){
    		cc.log("dataBack",paramTbl);
			// let proName = paramTbl.name
			// if(proName && for_maker[proName]){
			// 	for_maker[proName](paramTbl.data)
			// }
		});
        if(!!cbFunc){
        	cbFunc()
        }
    });
    cc.log("~~socket:",socket)
}

function __init__()
{
	window.for_caller = function() // funcname, param1, param2
	{
		if(!socket||socket.disconnected){return}
		var len = arguments.length;
		var msgTbl = {
			name:arguments[0],
			paramTbl:[]
		};
		if (len > 1)
		{
			for (var i = 1; i < len; i ++)
			{
				msgTbl.paramTbl.push(arguments[i]);
			}
		}
        socket.emit("client",msgTbl)
	};
	window.for_maker = {};
}

module.exports = {
	"connect":connect,
	"__init__":__init__,
};
