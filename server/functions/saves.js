const errors = require('../configs/errors.js').err
const { users, chats } = require('../configs/bd.js');
const { dirname } = require('../dirname.js');
const eid = require('../configs/vk.js').id;
const { vk } = require('../configs/vk.js')

console.log(dirname)

function save(name){
	var user = /^(?:users|игрок(?:и))/i;
	var chat = /^(?:chats|чат(?:ы))/i; 
	if(!name){
		throw Error(errors.name)
	} else {
		if(user.test(name)){
			require('fs').writeFileSync(`${dirname}/DataBase/users.json`, JSON.stringify(users, null, '\t'))
		} else if(chat.test(name)){
			require('fs').writeFileSync(`${dirname}/DataBase/chats.json`, JSON.stringify(chats, null, '\t'))
		}
	}
};

function saveAll(delay){
	if(!delay){
		throw Error(errors.delay)
	} else {
		let time = delay * 1000;
		setInterval(() => {
			require('fs').writeFileSync(`${dirname}/DataBase/users.json`, JSON.stringify(users, null, '\t'))
			require('fs').writeFileSync(`${dirname}/DataBase/chats.json`, JSON.stringify(chats, null, '\t'))
		}, time)
	}
}
async function chatRefresh(delay){
	if(!delay){
		throw Error(errors.delay)
	} else {
		let time = delay * 1000;

		if(chats.length > 0){
			setInterval(async() => {
				let h = chats.find(x=> x.id >= 1)
				await vk.api.messages.getConversationMembers({peer_id: h.peerId, group_id: eid})
				.then(async(res) => {
					await res.profiles.filter(x=> x.id >= 1).map(async i=> {
						let m = h.users.find(x=> x.id === i.id);
						let f = await res.items.find(x=> x.member_id === i.id)

						if(!m){
							if(!f.is_admin && !f.is_owner){
								h.users.push({
									id: i.id,
									name: `[id${i.id}|${i.first_name} ${i.last_name}]`,
									level: 1,
									ban: false,
									kick: false
								})
							} else if(f.is_admin && !f.is_owner){
								h.users.push({
									id: i.id,
									name: `[id${i.id}|${i.first_name} ${i.last_name}]`,
									level: 3,
									ban: false,
									kick: false
								})
							} else {
								h.users.push({
									id: i.id,
									name: `[id${i.id}|${i.first_name} ${i.last_name}]`,
									level: 4,
									ban: false,
									kick: false
								})
							}
						}
					})
					await res.groups.filter(x=> x.id >= 1).map(async i => {
						let f = h.groups.find(x=> x.id === i.id);
						let m = await res.items.find(x=> x.member_id === -i.id);

						if(!f){
							if(!m.is_admin && !m.is_owner){
								h.groups.push({
									id: i.id,
									name: i.name,
									screen_name: i.screen_name,
									level: 1,
									ban: false,
									kick: false
								})
							} else if(m.is_admin && !m.is_owner){
								h.groups.push({
									id: i.id,
									name: i.name,
									screen_name: i.screen_name,
									level: 3,
									ban: false,
									kick: false
								})
							} else {
								h.groups.push({
									id: i.id,
									name: i.name,
									screen_name: i.screen_name,
									level: 4,
									ban: false,
									kick: false
								})
							}
						}
					})


					await vk.api.messages.getConversationsById({peer_ids: h.peerId, extended: 1, group_id: eid})
					.then(async(res) => {
						await res.items.map(i=> {
							h.title = i.chat_settings.title;
							h.owner = i.chat_settings.owner_id;
							h.people = i.chat_settings.members_count;
						})
					})
					save('chats')
				})
			}, time)
		}

	}
}

module.exports = { save, saveAll, chatRefresh }