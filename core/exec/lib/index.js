'use strict';
const path = require('path');
const os = require('os');

const HOME_DIR = os.homedir();
module.exports = exec;
const Package = require('@hw-cli/package')

const SETTINGS = {
    'init': '@hw-cli/init'
}

async function exec(...args) {
    // TODO
    console.log(process.env.CLI_TARGET_PATH)
    let targetPath = process.env.CLI_TARGET_PATH
    const context = args[args.length - 1]
    const pkgName = SETTINGS[context.name()]
    const packageVersion = 'last'
    const CACHE_DIR = 'dependencies'
    console.log(pkgName)
    if(!targetPath) {
        targetPath = path.resolve(HOME_DIR, CACHE_DIR);
    }
    const storeDir = path.resolve(targetPath, 'node_modules')
    const pkg = new Package({
        packageVersion,
        name: pkgName,
        targetPath,
        storeDir
    })
    console.log(storeDir, targetPath)
    if(pkg.exist()) {

    } else {
        await pkg.install()
    }
    const rootFilePath = pkg.getRootFilePath()
    console.log(rootFilePath)
    require(rootFilePath)(...arguments)
}
