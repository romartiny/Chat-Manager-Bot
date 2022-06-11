const { vk, Keyboard, st, fs } = require('./server/configs/vk.js');
const { users, chats } = require('./server/configs/bd.js');
const { GetUserId } = require('./server/functions/GetUserId.js');
const { save, saveAll, chatRefresh } = require('./server/functions/saves.js');
const { cmd } = require('./server/configs/cmd.js');
const eid = require('./server/configs/vk.js').id;
const err = require('./server/configs/errors.js').err;

st.startPolling(); saveAll(5); chatRefresh(5)
console.log(`ЗапусК! ._.`.green)



st.on(['new_message'], async (ctx,next) => {
	let id = ctx.senderId;
	if(Number(id) <= 0) return;


	if(!users.find(x=> x.id === id)){
		let [l] = await vk.api.users.get({user_id: id})

		users.push({
			id: id,
			uid: users.length + 1,
			name: l.first_name
		})
		save('users')
	}

	if(ctx.isChat){
		if(!chats.find(x=> x.id === ctx.chatId)){
			chats.push({
				id: ctx.chatId,
				users: [],
				groups: [],
				title: '',
				owner: 0,
				reg: false,
				people: 0,
				uid: chats.length + 1,
				peerId: 0
			})
			save('chats')
		}
		h = chats.find(x=> x.id === ctx.chatId)
	}

	u = users.find(x=> x.id === id);
	await next();
})




st.on(['chat_invite_user'], async (ctx,next) => {
	if(ctx.eventMemberId === -eid){
		return ctx.send(`
		Тэкс..... ${require('./server/configs/vk.js').uri}


		Выдайте боту права Администратора, потом напишите /чек 
		`)
	} else {
		let h = chats.find(x=> x.id === ctx.chatId);
		let m = h.users.find(x=> x.id === ctx.eventMemberId)
		let w = h.users.find(x=> x.id === ctx.senderId);

		if(w.level < 3){
			if(m){
				if(m.ban === true){
					await ctx.send(`${m.name} был забанен в беседе!`)
					await vk.api.messages.removeChatUser({chat_id: ctx.chatId, user_id: ctx.eventMemberId})
					.catch((err) => {
						return ctx.send(err.message)
					})
				}
			}
		} else {
			await ctx.send(`${m.name} был забанен, но Его пригласил Администратор.`)
			m.ban = false;
		}
	}
	await next();
})
st.on(['chat_kick_user'], async (ctx,next) => {
	if(ctx.eventMemberId === -eid){
		let w = chats.find(x=> x.id === ctx.chatId)
		delete w.id;
		delete w.users;
		delete w.groups;
		delete w.title;
		delete w.owner;
		delete w.reg;
		delete w.people;
		delete w.uid;
		delete w.peerId;
	} else {
		let h = chats.find(x=> x.id === ctx.chatId)
		let m = h.users.find(x=> x.id === ctx.eventMemberId);
		if(ctx.eventMemberId !== ctx.senderId){
			m.kick = true;

			return ctx.send(`[id${m.id}|Был исключён из беседы].`)
		} else {
			return ctx.send(`[id${m.id}|Вышел из беседы].`)
		}
	}
	await next();
})

st.hear(cmd.start, ctx => {
	return ctx.send(`
	${h.reg !== true ? `Сначала разморозьте чат: /чек` : `
	${h.title}

	!инфо
	!состав
	!кик [ссылка|пересылаемое сообщение]
	!бан [ссылка|пересылаемое сообщение]
	!админ [ссылка|пересылаемое сообщение]
	!модер [ссылка|пересылаемое сообщение]
	`}

	`)
})

st.hear(cmd.admins, async ctx => {
	if(h.reg === true){
		let text = [];
		let count = 0; texxtt = [];
		let counnt = 0; let textt = [];

		await h.users.filter(x=> x.level === 4).map(i=> { text.push({message: `${i.name}`}) }); 
		await h.users.filter(x=> x.level === 3).map(i=> { counnt++; textt.push({message: `${i.name}`}) }); 
		await h.users.filter(x=> x.level === 2).map(i=> { count++; texxtt.push({message: `${i.name}`}) }); 
		
		await h.groups.filter(x=> x.level === 4).map(i=> { text.push({message: `<<[${i.screen_name}|${i.name}]>>`}) })
		await h.groups.filter(x=> x.level === 3).map(i=> { counnt++; textt.push({message: `<<[${i.screen_name}|${i.name}]>>`})  })
		await h.groups.filter(x=> x.level === 2).map(i=> { count++; texxtt.push({message: `<<[${i.screen_name}|${i.name}]>>`})  })
		let m = '';
		console.log(counnt, count)

		m += `
		Создатель чата: 
			ᅠ${
				text
				.map((i) => `${i.message}`)
			}
		`;
		if(counnt > 0){
			m += `Администраторы: [${counnt}]: 
			ᅠ${
				textt
				.map((i) => `${i.message}`)
				.join(", ")
			}
			\n`;
		}
		if(count > 0){
			m += `Модеры: [${count}]:
			ᅠ${
				texxtt
				.map((i) => `${i.message}`)
				.join(", ")
			}
			\n`
		}

		return ctx.send(m)

	} else {
		return ctx.send(err.no_chat)
	}
})

st.hear(cmd.kick, async ctx => {
	if(h.reg === true){
		let b = h.users.find(x=> x.id === ctx.senderId);
		if(b.level >= 3){
			let id = 0;
			await GetUserId(ctx).then((res) => { id = res });


			let w = h.users.find(x=> x.id === id);
			if(!w){
				return ctx.send(err.no_user)
			} else {
				if(w.level >= b.level){
					return ctx.send(`Не хватает прав.`)
				} else {
					w.kick = true;
					w.level = 1;
					save('chats')

					await ctx.send(`[id${w.id}|Вы будете кикнуты.]`)
					await vk.api.messages.removeChatUser({chat_id: ctx.chatId, user_id: w.id})
					.catch((err) => {
						return ctx.send(err.message)
					})
				}
			}
		}
	} else {
		return ctx.send(err.no_chat)
	}
})
st.hear(cmd.setadm, async ctx => {
	if(h.reg === true){
		if(h.users.find(x=> x.level === 4).id === ctx.senderId){
			let id = 0;
			await GetUserId(ctx).then((res) => { console.log(res); id = res});
			
			let w = h.users.find(x=> x.id === id)
			if(!w){
				return ctx.send(err.no_user)
			} else {
				if(w.level === 3) {
					return ctx.send(`${w.name} уже имеет Администратора `)
				} else if(w.id === h.users.find(x=> x.level === 3).id){
					return ctx.send(`Вы не можете себе выдать Администратора, т.к., Вы Создатель! ._.`)
				} else {
					w.level = 3;
					save('chats')
					return ctx.send(`Я [id${w.id}|ему] выдал Администратора! <3`)
				}				
			}
		} else {
			return ctx.send(err.use_owner)
		}
	} else {
		return ctx.send(err.no_chat)
	}
})
st.hear(cmd.setmod, async ctx => {
	if(h.reg === true){
		if(h.users.find(x=> x.level === 4).id === ctx.senderId){
			let id = 0;
			await GetUserId(ctx).then((res) => { console.log(res); id = res});
			
			let w = h.users.find(x=> x.id === id)
			if(!w){
				return ctx.send(err.no_user)
			} else {
				if(w.level === 2) {
					return ctx.send(`${w.name} уже имеет Модератора `)
				} else if(w.id === h.users.find(x=> x.level === 4).id){
					return ctx.send(`Вы не можете себе выдать Модератора, т.к., Вы Создатель! ._.`)
				} else {
					w.level = 2;
					save('chats')
					return ctx.send(`Я [id${w.id}|ему] выдал Модератора! <3`)
				}				
			}
		} else {
			return ctx.send(err.use_owner)
		}
	} else {
		return ctx.send(err.no_chat)
	}
})


st.hear(cmd.ban, async ctx => {
	if(h.reg === true){
		let b = h.users.find(x=> x.id === ctx.senderId);
		if(b.level >= 3) {
			let id = 0; await GetUserId(ctx).then((res) => { console.log(res); id = res });

			let w = h.users.find(x=> x.id === id);
			if(!w){
				return ctx.send(err.no_user)
			} else {
				if(w.level >= b.level){
					return ctx.send(b.level >= 3 ? `Вы не можете забанить Создателя.` : `Вы не можете забанить [id${id}|Его], т.к., Ваши права совпадают.`)
				} else if(w.ban === false) {
					w.ban = true;
					w.level = 1;
					save('chats')
					await ctx.send(`[id${w.id}|Вы будете забанены. Все вопросы к Создателю.]`)
					await vk.api.messages.removeChatUser({chat_id: ctx.chatId, user_id: id})
					.catch((err) => {
						return ctx.send(err.message)
					})
				} else {
					return ctx.send(`Он и так в Бане!`)
				}
			}

		} else {
			return ctx.send(err.use_owner_admin)
		}
	} else {
		return ctx.send(err.no_chat)
	}
})
st.hear(cmd.unban, async ctx => {
	if(h.reg === true){
		let b = h.users.find(x=> x.id === ctx.senderId);
		if(b.level >= 3) {
			let id = 0; await GetUserId(ctx).then((res) => { console.log(res); id = res });

			let w = h.users.find(x=> x.id === id);
			if(!w){
				return ctx.send(err.no_user)
			} else {
				if(w.ban === false){
					return ctx.send(`Вы не можете [id${w.id}|Его] разбанить. Он не в бане.`)
				} else {
					w.ban = false;
					save('chats')
					await ctx.send(`Я [id${w.id}|Его] разбанил.`)
				}
			}

		} else {
			return ctx.send(err.use_owner_admin)
		}
	} else {
		return ctx.send(err.no_chat)
	}
})

st.hear(cmd.unsetmod, async ctx => {
	if(h.reg === true){
		if(h.users.find(x=> x.level === 4).id === ctx.senderId){
			let id = 0;
			await GetUserId(ctx).then((res) => { console.log(res); id = res});
			
			let w = h.users.find(x=> x.id === id)
			if(!w){
				return ctx.send(err.no_user)
			} else {
				if(w.level === 1) {
					return ctx.send(`${w.name} не имеет Модератора `)
				} else if(w.id === h.users.find(x=> x.level === 4).id){
					return ctx.send(`Вы не можете с себе снять Модератора, т.к., Вы выше Модератора! ._.`)
				} else {
					w.level = 1;
					return ctx.send(`Я [id${w.id}|ему] снял Модератора! :c`)
				}				
			}
		} else {
			return ctx.send(err.use_owner)
		}
	} else {
		return ctx.send(err.no_chat)
	}
})
st.hear(cmd.unsetadm, async ctx => {
	if(h.reg === true){
		if(h.users.find(x=> x.level === 4).id === ctx.senderId){
			let id = 0;
			await GetUserId(ctx).then((res) => { console.log(res); id = res});
			
			let w = h.users.find(x=> x.id === id)
			if(!w){
				return ctx.send(err.no_user)
			} else {
				if(w.level === 1) {
					return ctx.send(`${w.name} не имеет Администратора `)
				} else if(w.id === h.users.find(x=> x.level === 4).id){
					return ctx.send(`Вы не можете с себе снять Администратора, т.к., Вы выше Администратора! ._.`)
				} else {
					w.level = 1;
					return ctx.send(`Я [id${w.id}|ему] снял Администратора! :c`)
				}				
			}
		} else {
			return ctx.send(err.use_owner)
		}
	} else {
		return ctx.send(err.no_chat)
	}
})


st.hear(cmd.info, async ctx => {
	if(h.reg === true){
		let [f] = await vk.api.users.get({user_id: h.owner})

		return ctx.send(`
		Название беседы: ${h.title}
		В беседе: ${h.people} чел. (${h.groups.length} ботов | ${h.users.length} уч.)


		Создатель беседы: [id${f.id}|${f.first_name} ${f.last_name}]
		`)

	} else {
		return ctx.send(err.no_chat)
	}
})
st.hear(cmd.check, async ctx => {
	if(h.reg === false){
		await vk.api.messages.getConversationMembers({peer_id: ctx.peerId, group_id: eid})
		.then(async(res) => {
			await res.profiles.filter(x=> x.id >= 1).map(async i=> {
				let m = h.users.find(x=> x.id === i.id);
				let f = await res.items.find(x=> x.member_id === i.id)

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
			})
			await res.groups.filter(x=> x.id >= 1).map(async i => {
				let f = h.groups.find(x=> x.id === i.id);
				let m = await res.items.find(x=> x.member_id === -i.id);

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
			})


			await vk.api.messages.getConversationsById({peer_ids: ctx.peerId, extended: 1, group_id: eid})
			.then(async(res) => {
				await res.items.map(i=> {
					h.title = i.chat_settings.title;
					h.owner = i.chat_settings.owner_id;
					h.people = i.chat_settings.members_count;
				})
			})

			h.reg = true;
			h.peerId = ctx.peerId;
			await ctx.send(`Чат (${h.title} [${h.uid}]) был зареган`)
			save('chats')
		})
		.catch((err) => {
			// console.log(err)
			return ctx.send(err.message)
		})
	} else {
		return ctx.send(`Чат и так был разморожен!`)
	}
})