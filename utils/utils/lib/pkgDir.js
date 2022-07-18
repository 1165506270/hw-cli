const findUp = require('find-up')
const path = require('path')
async function packageDirectory({cwd} = {}) {
	const filePath = await findUp('package.json', {cwd});
	return filePath && path.dirname(filePath);
}

function packageDirectorySync({cwd} = {}) {
	const filePath = findUp.sync('package.json', {cwd});
	return filePath && path.dirname(filePath);
}
module.exports = {
  packageDirectory,
  packageDirectorySync
}