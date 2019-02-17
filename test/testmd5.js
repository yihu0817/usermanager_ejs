// var crypto = require('crypto'); // 加载crypto库
var util = require('../utils/util');

// // console.log(crypto.getHashes()); // 打印支持的hash算法
// var content = '123'; // 加密的明文；
// var md5 = crypto.createHash('md5'); // 定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
// md5.update(content); // 加密
// var d = md5.digest('hex'); // 加密后的值d
// console.log('加密的结果：' + d); // 1692fcfff3e01e7ba8cffc2baadef5f5

var passWord = 'b123';
var psw = util.md5(passWord);
console.log('psw :' + psw);