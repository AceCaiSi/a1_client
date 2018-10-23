function invokeCallback(cb) {
	if (!!cb && typeof cb === 'function') {
		cb.apply(null, Array.prototype.slice.call(arguments, 1));
	}
}
module.exports = {
	"invokeCallback": invokeCallback,
};