#! /usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const semver = require('semver')
const colors = require('colors')
const dedent = require('dedent')
const dotenv = require('dotenv')
const path = require('path')
const pathExists = require('path-exists').sync
const { Command, Argument } = require('commander');

const pkg = require('../package.json')
const log = require('@hw-cli/log')
const constant = require('./consts')

const context = {
  version: pkg.version,
}
const userHome = constant.HOME_DIR
const checkNodeVersion = () => {
  const currentVersion = process.version
  const lowestVersion = constant.LOWEST_NODE_VIERSION
  if (!semver.gte(currentVersion, lowestVersion)) {
    throw new Error(
      colors.red(`hw-cli 只支持 v${lowestVersion} 以上版本的 nodejs`)
    )
  }
}
// 将当前用户降级，避免创建的文件所有者为root， 导致文件只有root用户才能修改的问题
const checkRoot = () => {
    const rootCheck = require('root-check')
    rootCheck()
}

const checkUserHome = () => {
    
    log.verbose(userHome)
    if(!userHome || !pathExists(userHome)) {
        throw new Error(
            colors.red(`当前登录用户主目录不存在！`)
        )
    }
}

const checkEnv = () => {
    const dotenvPath = path.join(userHome, '.env')
    if(pathExists(dotenvPath)) {
    dotenv.config({
        path: dotenvPath
    })
    log.verbose('环境变量', process.env.CLI_HOME)
}
   
}

const createDefaultConfig = () => {
    // const cliHome = 
}

const core = () => {
    try {
        checkNodeVersion()
        checkRoot()
        checkUserHome()
        checkEnv()
        const args = hideBin(process.argv)
        const program = new Command()
        program.name('string-utils')
            .description('cli to some')
            .version(pkg.version)
        program.option('-d --debug')
        program.command('split')
            .description('切分字符串')
            .argument('<string...>', 'string to split')
            .option('--first')
            .option('-s --separator <char>')
            .action((str, options) => {
                const limit = options.first ? 1 : undefined
                log.info(str.split(options.separator, limit))
            })
            program.command('join')
            .description('合并字符串数组')
            .addArgument(new Argument('<drink-size>', 'drink cup size').choices(['small', 'medium', 'large']))
            .argument('<str...>', 'string to join')
            .requiredOption('-s --separator <char>', '', '/')
            .action((drinkSize, strArray, options) => {
                console.log(options, strArray)
                log.info(strArray.join(options.separator))
            })
        program.on('option:debug', function() {
            if(program.debug) {
                process.env.LOG_LEVEL = 'verbose'
                log.level = process.env.LOG_LEVEL
                console.log(process.env.LOG_LEVEL)
            }
        })
        program.parse()
       
        // const cli = yargs()
        // cli
        //   .usage('Usage: $0 <command> [options]')
        //   .demandCommand(1, '最少需要输入一个命令')
        //   .recommendCommands()
        //   .strict()
        //   .fail((err) => {
        //     log.error(err)
        //   })
        //   // 设置别名
        //   .alias('h', 'help')
        //   .alias('v', 'version')
        //   // 设置宽度撑满屏幕
        //   .wrap(cli.terminalWidth())
        //   // 在输出最后打印
        //   .epilogue(
        //     dedent(`111
        //   111
        // `)
        //   )
        //   .options({
        //     debug: {
        //       type: 'boolean',
        //       describe: '启用debugger模式',
        //       alias: 'd',
        //     },
        //   })
        //   .group(['debug'], 'Dev Options')
        //   .command(
        //     'init [name]',
        //     '初始化项目',
        //     (yargs) => {
        //       yargs.option('name', {
        //         type: 'string',
        //         describe: '项目名称',
        //       })
        //     },
        //     (argv) => {
        //       console.log(argv)
        //     }
        //   )
        //   .command({
        //     command: 'list',
        //     alias: 'ls',
        //     describe: '打印所有模块',
        //     builder: (yargs) => {},
        //     handler: (argv) => {
        //       log.info(argv)
        //     },
        //   })
        //   .parse(args, context)
      } catch (e) {
          log.error(e.message)
      }
}

module.exports = core