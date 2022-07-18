'use strict';
const path = require('path');
module.exports = formatPath;

function formatPath(p) {
    const sep = path.sep
    if(p && typeof p === 'string') {
        if(sep === '/') {
            return p
        } else {
            return p.replace(/\\/g, '/')
        }
    }
    return p
}
