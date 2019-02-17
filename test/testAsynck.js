// 一个函数如果加上 async ，那么该函数就会返回一个 Promise
// async function test() {
//     return 10;
// }

// console.log(test());

// test().then(function (data) {
//     console.log(data);
// }).catch(function (err) {
//     console.log(err);
// });

var fs = require('fs');

function readFilePromise() {
    return new Promise(function (resolved, rejected) {
        fs.readFile('./test/test.json', function (err, data) {
            if (err) {
                rejected(err);
            } else {
                resolved(data);
            }
        });
    });
}

function readFilePromiseTwo() {
    return new Promise(function (resolved, rejected) {
        fs.readFile('./test/test.js', function (err, data) {
            if (err) {
                rejected(err);
            } else {
                resolved(data);
            }
        });
    });
}

// readFilePromise().then(function (data) {
//     console.log(data.toString());
// }).catch(function (err) {
//     console.log(err);
// });

async function testreadFilePromise() {
    var d1 = await readFilePromise();
    console.log(d1.toString());

    var d1 = await readFilePromiseTwo();
    console.log(d1.toString());

}

testreadFilePromise();