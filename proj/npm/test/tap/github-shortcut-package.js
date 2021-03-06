'use strict'
var fs = require('graceful-fs')
var path = require('path')

var mkdirp = require('mkdirp')
var osenv = require('osenv')
var requireInject = require('require-inject')
var rimraf = require('rimraf')
var test = require('tap').test

var common = require('../common-tap.js')

var pkg = path.resolve(__dirname, 'github-shortcut-package')

var json = {
  name: 'github-shortcut-package',
  version: '0.0.0',
  dependencies: {
    'private': 'foo/private'
  }
}

test('setup', function (t) {
  setup()
  t.end()
})

test('github-shortcut-package', function (t) {
  var cloneUrls = [
    ['git://github.com/foo/private.git', 'GitHub shortcuts try git URLs first'],
    ['https://github.com/foo/private.git', 'GitHub shortcuts try HTTPS URLs second'],
    ['git@github.com:foo/private.git', 'GitHub shortcuts try SSH third']
  ]
  var npm = requireInject.installGlobally('../../lib/npm.js', {
    'child_process': {
      'execFile': function (cmd, args, options, cb) {
        process.nextTick(function () {
          if (args[0] !== 'clone') return cb(null, '', '')
          var cloneUrl = cloneUrls.shift()
          if (cloneUrl) {
            t.is(args[3], cloneUrl[0], cloneUrl[1])
          } else {
            t.fail('too many attempts to clone')
          }
          cb(new Error())
        })
      }
    }
  })

  var opts = {
    cache: path.resolve(pkg, 'cache'),
    prefix: pkg,
    registry: common.registry,
    loglevel: 'silent'
  }
  npm.load(opts, function (er) {
    t.ifError(er, 'npm loaded without error')
    npm.commands.install([], function (er, result) {
      t.ok(er, 'mocked install failed as expected')
      t.end()
    })
  })
})

test('cleanup', function (t) {
  cleanup()
  t.end()
})

function setup () {
  cleanup()
  mkdirp.sync(pkg)
  fs.writeFileSync(
    path.join(pkg, 'package.json'),
    JSON.stringify(json, null, 2)
  )
  process.chdir(pkg)
}

function cleanup () {
  process.chdir(osenv.tmpdir())
  rimraf.sync(pkg)
}
