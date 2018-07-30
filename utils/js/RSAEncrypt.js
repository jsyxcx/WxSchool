//对需要的数据，进行签名
const storageKeyName = require('../../utils/js/storageKeyName.js')
const RSA = require('../../utils/js/RSA/RSA.js')
const Big = require('../../utils/js/RSA/BigInt.js')

var RSAEncrypt = (function(mod) {
	mod.enctype = function(encryptStr) {
		var shakeHand = storageKeyName.SHAKEHAND;
		//加密
		Big.setMaxDigits(129);
    var key00 = new RSA.RSAKeyPair(shakeHand.Exponent, '', shakeHand.Modulus);
    var temp11 = RSA.encryptedString(key00, encryptStr);
		return temp11;
	};
	return mod;
})(RSAEncrypt || {})

module.exports = RSAEncrypt;