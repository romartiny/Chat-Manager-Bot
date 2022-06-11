var yt_module = function(google_api_key){
    var request = require('request');
    var youtube = {
		methods: ["activities","captions","channels", "favorites","commentThread ","guideCategory","i18nLanguage","i18nRegion","playlist","playlistItem ","search","subscriptions","thumbnail ","videos","videoCategory","watermark"],
		key:google_api_key,
	    _api:function(method,fields,callback){
		        var fstr = []
		        for(x in fields){
		            fstr.push(x.toString()+"="+fields[x].toString());
		        }
		        return request.get("https://www.googleapis.com/youtube/v3/"+method+"?key="+youtube.key+"&"+fstr.join("&"), function(e,r,b){
		            return callback(JSON.parse(b))
		        })
	        }
    }
	youtube.api  = {}
	for(var m in youtube.methods){
        x = youtube.methods[m];
        //if(!youtube.api[x.split(".")[0]])youtube.api[x.split(".")[0]] = {};
        youtube.api[x] = (function(method){
        	return function(fields,callback){
	    	    youtube._api(method,fields,callback)
            }
        })(x)
    }
	return youtube;
}
module.exports = yt_module