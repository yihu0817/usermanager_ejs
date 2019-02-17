var crypto = require('crypto'); // 加载crypto库
// console.log(crypto.getCiphers()); // 打印支持的cipher算法
var util = require('../utils/util');

// var secret = 'web123key';
// var str = 'helloword'; // 明文

// var cipher = crypto.createCipher('aes192', secret); // 定义加密方式，两个参数分别是加密算法、密码
// cipher.update(str, 'utf8', 'hex'); // 加密，编码方式从utf-8转为hex;
// var enc = cipher.final('hex'); // 编码方式重转为hex;
// console.log(enc);

// var str1 = enc; // 密文
// var decipher = crypto.createDecipher('aes192', secret);

// decipher.update(str1, 'hex', 'utf8'); // 编码方式从hex转为utf-8;
// var dec = decipher.final('utf8'); // 编码方式重转utf-8;
// console.log(dec);


var enc = util.cipher('helloword');
console.log('加密后密文  :' + enc);

var dec = util.decipher(enc);
console.log('解密后明文 :' + dec);