/* eslint-disable radix */
var express = require('express');
// 导入querystring模块（解析post请求数据）
var control = require('../controller/userController');
var upload = require('../utils/fileupload_util');
var userRouter = express.Router();

/**
 * 用户添加
 */
userRouter.get('/add.do', control.add);

/**
 * 添加用户提交
 * 头像上传使用 upload.single('headerimg')
 */
userRouter.post('/add.do', upload.single('headerimg'), control.addSubmit);

/**
 * 检查用户名是否存
 */
userRouter.post('/checkUser.do', control.checkUser);

/**
 * 用户列表
 * 分页实现
 */
userRouter.get('/list.do', control.list);

/**
 * 删除用户
 */
userRouter.get('/delete.do', control.delete);

/**
 * 根据ID查询用户
 */
userRouter.get('/find.do', control.find);

/**
 * 修改用户提交
 */
userRouter.post('/update.do', control.update);


/**
 * 用户类型添加
 */
userRouter.get('/usertype.do', control.userType);


userRouter.post('/addUserType.do', control.addUserTypeSubmit);

module.exports = userRouter;