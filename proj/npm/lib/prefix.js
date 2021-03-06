module.exports = prefix

var npm = require('./npm.js')
var output = require('./utils/output.js')

prefix.usage = 'npm prefix [-g]'

function prefix (args, silent, cb) {
  if (typeof cb !== 'function') {
    cb = silent
    silent = false
  }
  if (!silent) output(npm.prefix)
  process.nextTick(cb.bind(this, null, npm.prefix))
}
