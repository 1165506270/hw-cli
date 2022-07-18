'use strict';
const path = require('path');
const npminstall = require('npminstall')
const fs = require('fs');
const { packageDirectorySync } = require('@hw-cli/utils/lib/pkgDir');
const formatPath = require('@hw-cli/format-path')


class Package {
    constructor(options) {
        if(!options) {
            throw new Error('new Package 参数 options 不能为空')
        }
        this.packageName = options.name
        this.storeDir = options.storeDir
        this.packageVersion = options.packageVersion
        this.targetPath = options.targetPath
    }
    // 包是否存在
    exist() {
        return !!this.getRootFilePath()
    }
    // 安装包
    async install() {
        await npminstall({
            root: this.targetPath,
            storeDir: this.storeDir,
            registry: 'http://192.168.55.226:8082/repository/quickf_node_module',
            pkgs: [
                {name: this.packageName, version: this.packageVersion}
            ]
        })
    }
    // 更新包
    update() {

    }
    // 获取包的主执行文件
    getRootFilePath() {
        // 获取包路径
        const dir = packageDirectorySync({cwd: this.targetPath})
        if(dir) {
            // 获取package.json文件
            const pkg = require(path.resolve(dir, 'package.json'))
            // 获取 main 属性中的文件地址
            if(pkg && pkg.main) {
                // 处理 win / mac 上的文件路径差异
                return formatPath(path.resolve(dir, pkg.main))
            }
        }
        
        return null
    }
}

module.exports = Package;