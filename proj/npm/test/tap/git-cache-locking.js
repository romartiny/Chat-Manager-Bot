var test = require('tap').test
var common = require('../common-tap')
var path = require('path')
var rimraf = require('rimraf')
var mkdirp = require('mkdirp')
var pkg = path.resolve(__dirname, 'git-cache-locking')
var tmp = path.join(pkg, 'tmp')
var cache = path.join(pkg, 'cache')
var shallowClone = Object.assign || require('util')._extend

test('setup', function (t) {
  rimraf.sync(pkg)
  mkdirp.sync(path.resolve(pkg, 'node_modules'))
  t.end()
})

test('git-cache-locking: install a git dependency', function (t) {
  // disable git integration tests on Travis.
  if (process.env.TRAVIS) return t.end()

  var gitEnv = shallowClone({}, process.env)
  gitEnv.npm_config_cache = cache
  gitEnv.npm_config_tmp = tmp
  gitEnv.npm_config_prefix = pkg
  gitEnv.npm_config_global = 'false'

  // package c depends on a.git#master and b.git#master
  // package b depends on a.git#master
  common.npm([
    'install',
    'git://github.com/nigelzor/npm-4503-c.git'
  ], {
    cwd: pkg,
    env: gitEnv
  }, function (err, code, stdout, stderr) {
    if (err) throw err
    t.equal(0, code, 'npm install should succeed')
    t.end()
  })
})

test('cleanup', function (t) {
  rimraf.sync(pkg)
  t.end()
})
