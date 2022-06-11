const { vk } = require('../configs/vk.js');
const snip = vk.snippets;

// snip.resolveResource('vk.com/id1').then((res) => { console.log(res) }).catch((err) => {console.log(err.message)})

module.exports = {
	GetUserId: async function GetUserId(ctx){
		var id = 0;

		if(ctx.replyMessage){
			id = ctx.replyMessage.senderId;
		} else {
			if(ctx.forwards.length > 0){
				id = ctx.forwards[0].senderId;
			} else {
				await snip.resolveResource(ctx.text.split(" ")[1])
				.then((res) => {
					console.log(res)
					id = res.id;
				})
				.catch((err) => {
					console.log(res.message)
					id = 0;
				})
			}
		}
		return id;
		// var id = 0;
		// // var a = undefined;
		// var https = /^(?:https|http)(?:\:\/\/)(vk[.]com|m[.]vk[.]com)\//gi;
		// var vkcom = /^(vk[.]com|m[.]vk[.]com)\//gi;

		// console.log(https.test(ctx.text.split(" ")[1]))
		// if(ctx.replyMessage){
		// 	id = ctx.replyMessage.senderId;
		// } else {
		// 	if(ctx.forwards.length >= 1){
		// 		id = ctx.forwards[0].senderId;
		// 	} else {
		// 		if(https.test(ctx.text.split(" ")[1]) || vkcom.test(ctx.text.split(" ")[1])){
		// 			if(https.test(ctx.text.split(" ")[1])){
		// 				console.log('1')
		// 				await vk.api.utils.resolveScreenName({screen_name: ctx.text.split(" ")[1].replace(https, "")})
		// 				.then((res) => {
		// 					console.log(res)
		// 					id = res.object_id;
		// 				})
		// 			} else {
		// 				console.log('2')
		// 				await vk.api.utils.resolveScreenName({screen_name: ctx.text.split(" ")[1].replace(vkcom, "")})
		// 				.then((res) => {
		// 					console.log(res)
		// 					id = res.object_id;
		// 				})
		// 			}
		// 		}				
		// 	}		
		// }


		// return id;
	}
}