// 配置规则
const log4js = require('log4js');

// 基本使用
// var logger = log4js.getLogger();
// logger.level = 'debug';
// logger.debug("Some debug messages");

log4js.configure({
    // 定义输出源
    appenders: {
        'rule_console': {
            type: 'console',
        },

        'access': {
            type: 'file',
            filename: 'log/access.log',
        },

        'rule-file': {
            'type': 'dateFile',
            'filename': 'log/server-',
            'encoding': 'utf-8',
            'maxLogSize': 1024 * 1024, // 文件大小
            'numBackups': 3,
            'pattern': 'yyyy-MM-dd.log',
            'alwaysIncludePattern': true,
        },
    },
    // 输出种类
    categories: {
        // 默认输出  var logger = log4js.getLogger();
        default: {
            appenders: ['rule_console'],
            level: 'debug',
        },
        // 名为 development的种类 var logger = log4js.getLogger('development');
        development: {
            appenders: ['rule_console', 'access', 'rule-file'],
            level: 'debug',
        },
        test: {
            appenders: ['rule-file'],
            level: 'info',
        }
    },
});

var logger = log4js.getLogger('test');

logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');