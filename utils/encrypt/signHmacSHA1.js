//将发送请求时的参数，进行签名
const CryptoJS = require('../../utils/encrypt/crypto-js/crypto-js.js')

var signHmacSHA1=(function(mod){
	mod.sign=function(message,value,callback){
    var encrypted = CryptoJS.HmacSHA1(message, value).toString(CryptoJS.enc.Base64);
		callback(encrypted);
	};
	return mod;
})(signHmacSHA1||{})
module.exports = signHmacSHA1