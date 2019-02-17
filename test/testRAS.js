const utils = require('../utils/utils');
const keys = require('../utils/keys');

const plainText = '你好，我是web前端工程师';
const crypted = utils.encrypt(plainText, keys.pubKey); // 加密
console.log(crypted.toString());

const decrypted = utils.decrypt(crypted, keys.privKey); // 解密

console.log(decrypted.toString()); // 你好，我是web前端工程师