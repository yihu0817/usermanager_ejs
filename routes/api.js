/* eslint-disable radix */
var express = require('express');
var apiRouter = express.Router();
var querydb = require('../utils/querydb');

/**
 * 用户添加
 */
apiRouter.get('/api/list', async function (req, res, next) {
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
        var json = {
            'userLists': userList,
            'currentPage': currentPage,
            'pageCount': pageCount,
        };
        res.send(json);
    } catch (err) {
        next(err);
    }
});

module.exports = apiRouter;