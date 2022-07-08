'use strict';



const npmlog = require('npmlog')
npmlog.level = process.env.LOG_LEVEL ?? 'info' // 设置 log 打印等级
npmlog.heading = 'hw-cli' // 设置打印前缀

module.exports = npmlog;

