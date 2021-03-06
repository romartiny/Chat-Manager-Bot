var fs = require('fs')
var path = require('path')

var mkdirp = require('mkdirp')
var osenv = require('osenv')
var rimraf = require('rimraf')
var test = require('tap').test

var common = require('../common-tap.js')
var pkg = path.join(__dirname, 'install-scoped-with-peer-dependency')
var local = path.join(pkg, 'package')

var EXEC_OPTS = { }

var json = {
  name: '@scope/package',
  version: '0.0.0',
  peerDependencies: {
    underscore: '*'
  }
}

test('setup', function (t) {
  setup()

  t.end()
})

test('it should install peerDependencies in same tree level as the parent package', function (t) {
  common.npm(['install', '--loglevel=warn', './package'], EXEC_OPTS, function (err, code, stdout, stderr) {
    t.ifError(err, 'install local package successful')
    t.equal(code, 0, 'npm install exited with code')
    t.match(stderr, /npm WARN @scope[/]package@0[.]0[.]0 requires a peer of underscore@[*] but none was installed[.]\n/,
      'npm install warned about unresolved peer dep')

    t.end()
  })
})

test('cleanup', function (t) {
  cleanup()
  t.end()
})

function setup () {
  cleanup()
  mkdirp.sync(local)
  mkdirp.sync(path.resolve(pkg, 'node_modules'))
  fs.writeFileSync(
    path.join(local, 'package.json'),
    JSON.stringify(json, null, 2)
  )
  process.chdir(pkg)
}

function cleanup () {
  process.chdir(osenv.tmpdir())
  rimraf.sync(pkg)
}
