function gamesgroup(_cb,data){
	if(!data)data = {};
	if(!data.access_token)data.access_token = vk.access_token;
	if(!_cb)return false;
	var pts,last_msg_id,users_info = {};
	groupstatus.api.groups.getLongPollServer({group_id:169745411},function(res){
		var longpollserver = res.response.server+"?act=a_check&key="+res.response.key+"&ts="+res.response.ts
		setInterval(function(){
			rq(longpollserver).then((res) => {
				if( !pts || pts < res.response.new_pts)pts = res.response.new_pts;
				delete res.response.profiles.map(function(profile){users_info[profile.id] = profile;});
				delete res.response.messages.items.map(function(msg){
					if(typeof msg == "number" || last_msg_id >= msg.id)return;
						last_msg_id = msg.id;
						msg.users_info = users_info;
						msg.user_info = (users_info[msg.user_id] || {});
						msg.peer_id = (msg.chat_id?msg.chat_id + 2000000000:msg.user_id);
						msg.reply = function(text,other,__cb,place){
							if(typeof other !== "object")other = {}
							other.peer_id = msg.peer_id;
							other.forward_messages = msg.id;
							other.access_token = data.access_token;
							other.message = ((typeof text == "string")?text:JSON.stringify(text));
							vk.api.messages.send(other,__cb || function(){},place || 0);
						};
						msg.send = function(text,other,__cb,place){
							if(typeof other !== "object")other = {}
							other.peer_id = msg.peer_id;
							other.access_token = data.access_token;
							other.message = ((typeof text == "string")?text:JSON.stringify(text));
							vk.api.messages.send(other,__cb || function(){},place || 0);
						};
						msg.sendPhoto = function(p,message,cb) {
							vk.api.upload.MessagesPhoto({photo: fs.createReadStream(p)}, function(a) {
								msg.send(message,{attachment:"photo"+a.response[0].owner_id+"_"+a.response[0].id}, cb);
							});
						};
						_cb(msg);
					});
			})
		},data.interval || 500);
	});
}


    vk.longpollgroup = {
        exit: false,
        started: false,
        stop: function (callback) {
            return new Promise(function(resolve, reject) {
                vk.longpollgroup.exit = function (data) {
                    resolve(data);
                    if(callback) callback(data);
                };
                if(!vk.longpollgroup.started){
                    vk.longpollgroup.exit({error: "stoped"});
                    return;
                }
            });
        },
        start: function(opts) {
            vk.longpollgroup.started = true;
            vk("groups.getLongPollServer", {
                group_id:170392393
            }).then(function (data) {
                return vk.longpollgroup.listen(data);
            });
            return vk;
        },
        listen: function (data) {
            if (!data.server) throw {error: "Invalid server", data};
            vk.on("LongPollRequest", data);
            return request("https://" + data.server + "?act=a_check&key=" + data.key + "&ts=" + data.ts)
                .then(tryJSON)
                .then(function(body) {
                    vk.on("LongPollResponse", body);
					console.log(body)
                    if (body.error || body.failed) {
                        throw body;
                    } else if (body.updates) {
                        body.updates.map(vk.on.bind(this, "update"));
                        data.ts = body.ts;
                    }
                    if(vk.longpollgroup.exit) throw data;
                    return vk.longpollgroup.listen(data);
                }).catch(function(e) {
                    if(vk.longpollgroup.exit){
                        if(typeof vk.longpollgroup.exit == "function") vk.longpollgroup.exit(e);
                        vk.longpollgroup.exit = false;
                        vk.longpollgroup.started = false;
                        return vk.on("LongPollStop", e);
                    }else {
                        vk.on("LongPollError", e);
                        return vk.longpollgroup.start(options);
                    }
                });
        }
    };