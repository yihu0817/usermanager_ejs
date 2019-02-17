var log4js = require('log4js'); // 引入日志包

var logger = log4js.getLogger(); // 获取日志对象

logger.level = 'debug'; // 设置日志级别   由低 -> 高

// 打印日志
logger.all(' all >>>>');
logger.trace(' trace >>>>');
logger.debug(' debug >>>>');
logger.info(' info >>>>');
logger.warn(' warn >>>>');
logger.error(' error >>>>');
logger.fatal(' fatal >>>>');

/**
 * 
 * 日志的输出级别, 共: ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF八个级别,
     default level is OFF
 只有大于等于日志配置级别的信息才能输出出来:
     如果日志级别设为 info 那么大于等info级别的日志信息会输出， 小于则不会； 上述代码只能输出 info >>> > , warn >>> > , error >>> , fatal >>>
 * 
 */