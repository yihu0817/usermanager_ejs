/* eslint-disable valid-jsdoc */
/* eslint-disable radix */
var querydb = require('../utils/querydb');
var util = require('../utils/util');

/**
 * 用户添加
 */
exports.add = async function (req, res) {
    // 查询用户类型
    var sql = 'SELECT tid, tname FROM user_type';
    var userTypes = await querydb(sql);
    console.log(JSON.stringify(userTypes));
    res.render('user/user_add', {
        types: userTypes,
    });
};

/**
 * 异步检查用户名是否已经存在 AJAX
 */
exports.checkUser = async function (req, res, next) {
    var username = req.body.username;
    console.log('checkUser >>> ' + username);

    var sql = 'SELECT count(*) AS count  FROM user WHERE username = ?';
    var data = await querydb(sql, [username]);
    var num = data[0].count;
    // 判断用户名是否存在
    if (num !== 0) {
        res.send({
            code: 1,
            msg: '用户名已经存在 !',
        });
    } else {
        res.send({
            code: 0,
        });
    }
};

/**
 * 添加用户提交
 * 头像上传使用 upload.single('headerimg')
 */
exports.addSubmit = async function (req, res, next) {
    var userName = req.body.clientname;
    var passWord = req.body.password;
    var tid = req.body.typeid;
    console.log('tid :' + tid);
    // md5加密password
    var psw = util.md5(passWord);
    try {
        var sql = 'INSERT INTO user (username,password,headerurl, typeid)VALUES (?,?,?,?)';
        var paramers = [userName, psw, req.session.headerimg, tid];

        await querydb(sql, paramers);
        res.redirect('/list.do');
    } catch (error) {
        next(error);
    }

};

/**
 * 用户列表
 * 分页实现
 */
exports.list = async function (req, res, next) {
    var pageCount = 0; // 总页数
    var pageSize = 5; // 每页5条记录
    var currentPage = 1; // 当前页
    if (req.query.pageNo) {
        currentPage = req.query.pageNo;
    }
    try {
        var sqlCount = 'SELECT count(*) AS count FROM user';
        var totalCount = await querydb(sqlCount);
        var total = totalCount[0].count;

        if (total % pageSize === 0) {
            pageCount = parseInt(total / pageSize);
        } else {
            pageCount = parseInt(total / pageSize) + 1;
        }

        var startIndex = (currentPage - 1) * pageSize; // 计算偏移量
        var sql = 'SELECT id,username,password,headerurl FROM user ORDER BY id DESC limit ?, ? ';
        var paramers = [startIndex, pageSize];
        var userList = await querydb(sql, paramers);

        res.render('user/user_list', {
            'userLists': userList,
            'currentPage': currentPage,
            'pageCount': pageCount,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * 删除用户
 */
exports.delete = async function (req, res, next) {
    // 接收get请求参数
    var id = req.query.uid;
    var sql = 'DELETE FROM user WHERE id = ?';
    var parameters = [id];
    try {
        await querydb(sql, parameters);
    } catch (err) {
        next(err);
    }

    res.redirect('/list.do');
};

/**
 * 根据ID查询用户
 */
exports.find = async function (req, res, next) {
    // 接收get请求参数
    // var id = req.params.uid;
    var id = req.query.uid;
    var sql = 'SELECT id,username,password FROM user WHERE id = ?';
    var parameters = [id];

    try {
        // 可能发生异常
        var data = await querydb(sql, parameters);
        res.render('user/user_update', data[0]);

    } catch (err) {
        // 处理异常
        next(err);
    }

};

/**
 * 修改用户提交
 */
exports.update = async function (req, res, next) {
    var username = req.body.clientname;
    var password = req.body.password;
    var id = req.body.uid;

    // md5加密password
    var psw = util.md5(password);
    var parametes = [username, psw, id];

    var sql = 'UPDATE user SET username = ?, password = ? WHERE id = ?';
    try {
        await querydb(sql, parametes);
        res.redirect('/list.do');
    } catch (err) {
        next(err);
    }

};


exports.userType = function (req, res, next) {
    res.render('user/user_type');
};

exports.addUserTypeSubmit = async function (req, res, next) {
    var type = req.body.usertype;
    var sql = 'INSERT INTO user_type (tname)VALUES(?)';
    await querydb(sql, [type]);
    res.send('添加用户类型成功');
};