var ffmpeg = require('fluent-ffmpeg');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var fs = require('fs');

function Converter() {
	EventEmitter.call(this);
}

util.inherits(Converter, EventEmitter);

Converter.prototype.setFfmpegPath = function(path, cb) {
		ffmpeg.setFfmpegPath(path);
		cb(null);
};

Converter.prototype.convert = function(path, dest, cb) {
		var infs = fs.createReadStream(path);
		var self = this;
		var command = ffmpeg(infs);

		command.on('end', function() {
			return cb(null);
		});

		command.on('error', function(err) {
			return cb(err);
		});

		command.save(dest);

};


module.exports = new Converter();