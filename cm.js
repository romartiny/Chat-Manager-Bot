var fs = require("fs")
var playa_module = require("playadope.js")
var manager = playa_module("vk1.a.CY3m2UdGtcsD5t_1srJacrLvzxjy1EvOa0d7KQ_zL0gnyax6bYRKAXjIcYPpadBOYhDZ3eADAE42vgJjQGN_ZmTitxBytFlgyIoPyLTVDcIsEmcvs2VbK6sR5tlxnyJEZWatHU_WehPTxNVzim9B6_EwSjfVRCUPRe3B07fGnXZbNd4zF8YFFX8x1FCuDsTW") // токен
// var database = require("/data/bd/database.json")
var database = require("./data/bd/database.json");
var settings = {
	"prefix": "/",
	"group_id": 202133184
}

manager.addGroup.LongPoll(function (msg) {
	if (msg.peer_id < 1) return manager.api.messages.send({ peer_id: msg.peer_id, message: `Ошибка! \n -- Бот работает только в беседе!` })
	if (msg.peer_id > 2000000000) msg.chat_id = msg.peer_id - 2000000000
	msg.send = function (text, other) {
		if (typeof other !== "object") other = {}
		if (other.user_id) other.peer_id = other.user_id
		if (other.chat_id) other.peer_id = 2000000000 + other.chat_id
		if (!other.user_id && !other.chat_id) other.peer_id = msg.peer_id
		other.message = ((typeof text == "string") ? text : JSON.stringify(text))
		manager.api.messages.send(other)
	}
	function findChatDBid(element) {
		if (element.chat_id == msg.chat_id) {
			return element
		}
	}
	function findStaff(element) {
		if (element.user_id == msg.from_id) {
			return element
		}
	}
	var chatDBid = database.chats.findIndex(findChatDBid)
	if (chatDBid < 0) {
		database.chats.push({ "chat_id": msg.chat_id, "key": `${randomString(3)}`, "kalimatorniy": { "rules": "Не установлены", "hi": "Приветствую тебя путник! изучи обязательно правила /rules"}, "info": { "title": "Не установлено", "creator": 0 }, "stats": { "msg_count": 0, "mat": 0, "symbols": 0 }, "defend": { "autokick": 0, "inv_grp": 0 }, "cmds": { "cmd_info": 1, "cmd_roles": 1, "cmd_defend": 1, "cmd_reload": 2, "cmd_kick": 2, "cmd_black": 3, "cmd_warn": 3, "cmd_ban": 4, "cmd_unban": 4, "cmd_status": 5, "cmd_dostup": 5, "cmd_stats": 1, "cmd_rules": 1, "cmd_newrules": 5,"cmd_eval": 100,"cmd_newmotd": 5,"cmd_motd": 1 }, "roles": [], "banned": [], "blacklisted": [], "users": [] })

		msg.send(`☑Спасибо за использование именно нашего менеджера!

📝Список всех команд доступен по этой ссылке : 
vk.com/@-181026227-osnovy-upravleniya-funkcionalom-chat-guard

✔Не забудьте сделать бота администратором! `) 

		upd_db()
		chatDBid = database.chats.findIndex(findChatDBid)
		checkChat(msg.peer_id, chatDBid, msg, 0)
	}
	else {
		var l = database.chats[chatDBid].roles.findIndex(findStaff)
		var f = 1
		if (database.chats[chatDBid].roles[l]) {
			f = database.chats[chatDBid].roles[l].role
		}
		if (msg.action) {
			if (msg.action.type == "chat_title_update" && !msg.out) {
				if (f >= 4) {
					if (!blockurls(msg.action.text)) {
						database.chats[chatDBid].info.title = msg.action.text
						upd_db()
					}
				}
				else {
					manager.api.messages.editChat({ chat_id: msg.chat_id, title: database.chats[chatDBid].info.title })
				}
			}
			else if (msg.action.type == "chat_photo_update" || msg.action.type == "chat_photo_remove") {

			}
			else if (msg.action.type == "chat_pin_message" || msg.action.type == "chat_unpin_message") {

			}
			else if (msg.action.type == "chat_invite_user_by_link") {
				function findsss(element) {
					if (element.user_id == msg.from_id) {
						return element
					}
				}
				var fc = database.chats[d].users.findIndex(findsss)
				if (fc == -1) {
					database.chats[chatDBid].users.push({ "user_id": msg.from_id, "msg_count": 0, "symbols": 0, "warns": 0 })
					upd_db()
				}
			}
			else if (msg.action.type == "chat_invite_user") {
				function findsss(element) {
					if (element.user_id == msg.action.member_id) {
						return element
					}
				}
				var fc = database.chats[chatDBid].users.findIndex(findsss)
				if (fc == -1) {
					if (msg.action.member_id > 0) {
						var fname = manager.apiSync.users.get({ user_ids: msg.from_id, fields: "first_name" }).response[0].first_name
				       msg.send(`${database.chats[chatDBid].kalimatorniy.hi}`) 
						database.chats[chatDBid].users.push({ "user_id": msg.action.member_id, "msg_count": 0, "symbols": 0, "warns": 0 })
						upd_db()
					}
				}
				if (msg.action.member_id == msg.from_id) {
					var fname = manager.apiSync.users.get({ user_ids: msg.from_id, fields: "first_name" }).response[0].first_name
					msg.send(`${fname}, c возвращением в беседу!`)
				}
				else {
					if (msg.action.member_id < 0) {
						if (database.chats[chatDBid].defend.inv_grp == 1) {
							if (f < 3) {
								manager.api.messages.removeChatUser({ member_id: msg.action.member_id, chat_id: msg.chat_id })
							}
						}
					}
					if (database.chats[chatDBid].banned.indexOf(msg.action.member_id) > -1) {
						function findid(element) {
							if (element == msg.action.member_id) {
								return element
							}
						}
						if (f < 3) {
							manager.api.messages.removeChatUser({ member_id: msg.action.member_id, chat_id: msg.chat_id })
						}
						else {
							var ub = database.chats[chatDBid].banned.findIndex(findid)
							database.chats[chatDBid].banned.splice(ub, 1)
							upd_db()
						}
					}
				}
			}
			else if (msg.action.type == "chat_kick_user") {
				if (msg.action.member_id == msg.from_id) {
					if (database.chats[chatDBid].defend.autokick == 1) {
						if (f == 1) {
							manager.api.messages.removeChatUser({ member_id: msg.from_id, chat_id: msg.chat_id }, function (gg) {
								msg.send(`@id${msg.from_id} (Пользователь), покинул беседу и был кикнут с неё`)
							})
						}
					}
					else {
						if (f == 1) {
								msg.send(`@id${msg.from_id} (Пользователь), потерпел крушения коробля, и теперь кормит рыб своей плотью..`)
						}
					}
				}
			}
		}
		else {
			if (msg.from_id < 0) return
			var r1 = new RegExp("\^("+settings.prefix+")\(.*)", `i`)
			var r2 = new RegExp(settings.prefix + `\$`, `iy`)
			var name = manager.apiSync.users.get({user_ids: msg.from_id, fields:"first_name"}).response[0].first_name
			if (database.chats[chatDBid].blacklisted.indexOf(msg.from_id) > -1) return
			function findsss(element) {
				if (element.user_id == msg.from_id) {
					return element
				}
			}
			var fc = database.chats[chatDBid].users.findIndex(findsss)
			if (fc == -1) return checkChat(msg.peer_id, chatDBid, msg, 0)
			database.chats[chatDBid].stats.msg_count += 1
			database.chats[chatDBid].users[fc].msg_count += 1
			if (msg.text) {
				database.chats[chatDBid].stats.symbols += msg.text.length
				database.chats[chatDBid].users[fc].symbols += msg.text.length
			}
					if(msg.text.match(/(еб|епт|пиз|бл|пизда|пздц|ебпт|6ля|6лядь|6лять|b3ъeб|cock|cunt|e6aль|ebal|eblan|eбaл|eбaть|eбyч|eбать|eбёт|eблантий|fuck|fucker|fucking|xyёв|xyй|xyя|xуе|xуй|xую|zaeb|zaebal|zaebali|zaebat|архипиздрит|ахуел|ахуеть|бздение|бздеть|бздех|бздецы|бздит|бздицы|бздло|бзднуть|бздун|бздунья|бздюха|бздюшка|бздюшко|бля|блябу|блябуду|бляд|бляди|блядина|блядище|блядки|блядовать|блядство|блядун|блядуны|блядунья|блядь|блядюга|блять|вафел|вафлёр|взъебка|взьебка|взьебывать|въеб|въебался|въебенн|въебусь|въебывать|выблядок|выблядыш|выеб|выебать|выебен|выебнулся|выебон|выебываться|выпердеть|высраться|выссаться|вьебен|гавно|гавнюк|гавнючка|гамно|гандон|гнид|гнида|гниды|говенка|говенный|говешка|говназия|говнецо|говнище|говно|говноед|говнолинк|говночист|говнюк|говнюха|говнядина|говняк|говняный|говнять|гондон|доебываться|долбоеб|долбоёб|долбоящер|дота|дрисня|дрист|дристануть|дристать|дристун|дристуха|дрочелло|дрочена|дрочила|дрочилка|дрочистый|дрочить|дрочка|дрочун|е6ал|е6ут|еб твою мать|ёб твою мать|ёбaн|ебaть|ебyч|ебал|ебало|ебальник|ебан|ебанамать|ебанат|ебаная|ёбаная|ебанический|ебанный|ебанныйврот|ебаное|ебануть|ебануться|ёбаную|ебаный|ебанько|ебарь|ебат|ёбат|ебатория|ебать|ебать-копать|ебаться|ебашить|ебёна|ебет|ебёт|ебец|ебик|ебин|ебись|ебическая|ебки|ебла|еблан|ебливый|еблище|ебло|еблысть|ебля|ёбн|ебнуть|ебнуться|ебня|ебошить|ебская|ебский|ебтвоюмать|ебун|ебут|ебуч|ебуче|ебучее|ебучий|ебучим|ебущ|ебырь|елда|елдак|елдачить|жопа|жопу|заговнять|задрачивать|задристать|задрота|зае6|заё6|заеб|заёб|заеба|заебал|заебанец|заебастая|заебастый|заебать|заебаться|заебашить|заебистое|заёбистое|заебистые|заёбистые|заебистый|заёбистый|заебись|заебошить|заебываться|залуп|залупа|залупаться|залупить|залупиться|замудохаться|запиздячить|засерать|засерун|засеря|засирать|засрун|захуячить|заябестая|злоеб|злоебучая|злоебучее|злоебучий|ибанамат|ибонех|изговнять|изговняться|изъебнуться|ипать|ипаться|ипаццо|какдвапальцаобоссать|конча|курва|курвятник|лох|лошарa|лошара|лошары|лошок|лярва|малафья|манда|мандавошек|мандавошка|мандавошки|мандей|мандень|мандеть|мандища|мандой|манду|мандюк|минет|минетчик|минетчица|млять|мокрощелка|мокрощёлка|мразь|мудak|мудaк|мудаг|мудак|муде|мудель|мудеть|муди|мудил|мудила|мудистый|мудня|мудоеб|мудозвон|мудоклюй|на хер|на хуй|набздел|набздеть|наговнять|надристать|надрочить|наебать|наебет|наебнуть|наебнуться|наебывать|напиздел|напиздели|напиздело|напиздили|насрать|настопиздить|нахер|нахрен|нахуй|нахуйник|не ебет|не ебёт|невротебучий|невъебенно|нехира|нехрен|нехуй|нехуйственно|ниибацо|ниипацца|ниипаццо|ниипет|никуя|нихера|нихуя|обдристаться|обосранец|обосрать|обосцать|обосцаться|обсирать|объебос|обьебать|обьебос|однохуйственно|опездал|опизде|опизденивающе|остоебенить|остопиздеть|отмудохать|отпиздить|отпиздячить|отпороть|отъебись|охуевательский|охуевать|охуевающий|охуел|охуенно|охуеньчик|охуеть|охуительно|охуительный|охуяньчик|охуячивать|охуячить|очкун|падла|падонки|падонок|паскуда|педерас|педик|педрик|педрила|педрилло|педрило|педрилы|пездень|пездит|пездишь|пездо|пездят|пердануть|пердеж|пердение|пердеть|пердильник|перднуть|пёрднуть|пердун|пердунец|пердунина|пердунья|пердуха|пердь|переёбок|пернуть|пёрнуть|пи3д|пи3де|пи3ду|пиzдец|пидар|пидарaс|пидарас|пидарасы|пидары|пидор|пидорасы|пидорка|пидорок|пидоры|пидрас|пизда|пиздануть|пиздануться|пиздарваньчик|пиздато|пиздатое|пиздатый|пизденка|пизденыш|пиздёныш|пиздеть|пиздец|пиздит|пиздить|пиздиться|пиздишь|пиздища|пиздище|пиздобол|пиздоболы|пиздобратия|пиздоватая|пиздоватый|пиздолиз|пиздонутые|пиздорванец|пиздорванка|пиздострадатель|пизду|пиздуй|пиздун|пиздунья|пизды|пиздюга|пиздюк|пиздюлина|пиздюля|пиздят|пиздячить|писбшки|писька|писькострадатель|писюн|писюшка|по хуй|по хую|подговнять|подонки|подонок|подъебнуть|подъебнуться|поебать|поебень|поёбываает|поскуда|посрать|потаскуха|потаскушка|похер|похерил|похерила|похерили|похеру|похрен|похрену|похуй|похуист|похуистка|похую|придурок|приебаться|припиздень|припизднутый|припиздюлина|пробзделся|проблядь|проеб|проебанка|проебать|промандеть|промудеть|пропизделся|пропиздеть|пропиздячить|раздолбай|разхуячить|разъеб|разъеба|разъебай|разъебать|распиздай|распиздеться|распиздяй|распиздяйство|распроеть|сволота|сволочь|сговнять|секель|серун|серька|сестроеб|сикель|сила|сирать|сирывать|соси|спиздел|спиздеть|спиздил|спиздила|спиздили|спиздит|спиздить|срака|сраку|сраный|сранье|срать|срун|ссака|ссышь|стерва|страхопиздище|сука|суки|суходрочка|сучара|сучий|сучка|сучко|сучонок|сучье|сцание|сцать|сцука|сцуки|сцуконах|сцуль|сцыха|сцышь|съебаться|сыкун|трахае6|трахаеб|трахаёб|трахатель|ублюдок|уебать|уёбища|уебище|уёбище|уебищное|уёбищное|уебк|уебки|уёбки|уебок|уёбок|урюк|усраться|ушлепок|х_у_я_р_а|хyё|хyй|хyйня|хамло|хер|херня|херовато|херовина|херовый|хитровыебанный|хитрожопый|хуeм|хуе|хуё|хуевато|хуёвенький|хуевина|хуево|хуевый|хуёвый|хуек|хуёк|хуел|хуем|хуенч|хуеныш|хуенький|хуеплет|хуеплёт|хуепромышленник|хуерик|хуерыло|хуесос|хуесоска|хуета|хуетень|хуею|хуи|хуй|хуйком|хуйло|хуйня|хуйрик|хуище|хуля|хую|хуюл|хуя|хуяк|хуякать|хуякнуть|хуяра|хуясе|хуячить|целка|чмо|чмошник|чмырь|шалава|шалавой|шараёбиться|шлюха|шлюхой|шлюшка|ябывает)/i)) {
			database.chats[chatDBid].stats.mat += 1
			database.chats[chatDBid].users[fc].mat += 1	
			}
			if (msg.text.match(r1)) {
				msg.text = msg.text.replace(new RegExp(`${settings.prefix}`, `i`), ``)
				function findcmd(element, index) {
					if (msg.text.match(manager_cmds[index].regexp)) {
						return element

					}
				}
				var cmd = manager_cmds.findIndex(findcmd)
				if (cmd >= 0) {
					var matched = msg.text.match(manager_cmds[cmd].regexp)
					manager_cmds[cmd].f(matched, msg, name, chatDBid, f)

				}
			}

			else if (msg.text.match(r2)) {

			} 
		}
	}
},
{ 
	interval: 0, group_id: settings.group_id })
    
var manager_cmds = [
	{

				regexp: /^(?:cmd|кмд)/i,
		f: function (params, msg, name, d, l) {
				let pr = settings.prefix;
			msg.send(`					
				    ${name}, список команд в беседе:
					🆘 ${pr}help - Полная информация о всех командах.
					📄 ${pr}admins - Список управляющих чатом. 
					🛡 ${pr}protection - Система защиты беседы. 
					💾 ${pr}update - Обновить информацию о чате.
					🚫 ${pr}kick - Исключить пользователя из беседы.
					🔞 ${pr}blacklist - Внести/убрать пользователя из Черного Списка.
					⛔ ${pr}ban - Выдать перманентную блокировку пользователю.
					💉 ${pr}unban - Разблокировать пользователя. 
					📋 ${pr}setrole <ссылка> <уровень>
					👮 ${pr}setdostup - Редакция доступа для команд.
					⚠ ${pr}warn - Выдать предупреждение пользователю.
					🔱 ${pr}unwarn - Снять все предупреждения у пользователю.
					📊 ${pr}stats - Статистика чата.
					🔎 ${pr}check - Проверить работоспособность чата.
					💫 ${pr}setmotd [приветствие] - Устанавливает приветствие.
					👁‍🗨 ${pr}motd - Проверить работоспособность приветствия.

					`);
		},
	},
	{
		regexp: /^(?:помощь|help)/i,
		f: function (params, msg, name, d, l) {
			msg.send(`💡 ${name}, Полная информация о всех командах для чата и дополнительные команды тут: https://m.vk.com/@-181026227-osnovy-upravleniya-funkcionalom-chat-guard`);
		},
	},
	{
		regexp: /^(?:стафф|staff|состав|team|admins|администрация)$/i,
		f: function (params, msg, name, d, l) {
						let pr = settings.prefix;
			if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!

				⚠ Если бот уже админ то напишите: ${pr}check`);

			if (database.chats[d].cmds.cmd_roles > l) return msg.send(`
				🚫 ${name}, Вы не можете использовать данную команду.
				Чтобы использовать данную команду вам необходим статус: (${database.chats[d].cmds.cmd_roles})`)
			var arr = database.chats[d].roles.filter(a => a.role > 1 && a.user_id > 0).map(a => a.user_id)
			var names = manager.apiSync.users.get({ user_ids: arr.join(","), fields: "first_name" }).response

			msg.send(`${name}, пользователи с ролью выше участника.
				${database.chats[d].roles.map(a => `🔸 @id${a.user_id}(${names.filter(e => e.id == a.user_id)[0].first_name}) - `+(a.role == 5 ? "Создатель беседы." : "") + (a.role == 4 ? "Администратор." : "") + (a.role == 3 ? "Модератор." : "") + (a.role == 2 ? "Помощник." : "")).join("\n")}`)
		},
	},
	{
		regexp:/^(?:защита|protection)/i,
		f: function (params, msg, name, d, l) {
					let prr = settings.prefix;
						if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!

				⚠ Если бот уже админ то напишите: ${prr}check`);

			if (database.chats[d].cmds.cmd_defend > l) return msg.send(`				
				🚫 ${name}, Вы не можете использовать данную команду.
				Чтобы использовать данную команду вам необходим статус: (${database.chats[d].cmds.cmd_defend}`)

                     if(msg.text.match(/^(?:защита|protection)$/i)) { 
				msg.send(`🚫 ${name}, защитные функции чата:
					🔻 1. Автокик [3]: ${(database.chats[d].defend.autokick == 1 ? "✅ Включен" : "🚫 Выключен")}
					🔻 2. Защита приглашений групп [3]: ${(database.chats[d].defend.inv_grp == 1 ? "✅ Включен" : "🚫 Выключен")}

					⚠ Чтобы включить/выключить защиту введите: ${prr}защита [номер защиты]`)
			}
                    else if(msg.text.match(/^(?:защита|protection) ([0-9]+)$/i)) { 
                     var pr = msg.text.match(/^(?:защита|protection) ([0-9]+)$/i) 
                     if(pr[1] == 1) { 
					if (database.chats[d].defend.autokick == 0) {
						database.chats[d].defend.autokick = 1
						upd_db()
						msg.send(`✅ ${name} Вы включили автокик, будьте осторожны!`)
					}
					else if (database.chats[d].defend.autokick == 1) {
						database.chats[d].defend.autokick = 0
						upd_db()
						msg.send(`✅ ${name}, Вы выключили автокик!`)
					}
				}
				else if (pr[1] == 2) {
					if (database.chats[d].defend.inv_grp == 0) {
						database.chats[d].defend.inv_grp = 1
						upd_db()
						msg.send(`${name}, Вы включили защиту от приглашений групп в этот чат.
							🔹 Теперь группы не смогут зайти пока кто-то со статусом [3] и выше пригласит их!

							⚠ Если кто-то решит пригласить группу, то приглашённая группа будет кикнута`)
					}
					else if (database.chats[d].defend.inv_grp == 1) {
						database.chats[d].defend.inv_grp = 0
						upd_db()
						msg.send(`${name}, Вы выключили защиту от приглашений групп в этот чат!`)
					}
				}
			}
		},
	},
	{
		regexp: /^(?:blacklist|черный список|чс|блеклист) (.*)$/i,
		f: function (params, msg, name, d, l) {
								let prr = settings.prefix;
						if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!

				⚠ Если бот уже админ то напишите: ${prr}check`);
			if (database.chats[d].cmds.cmd_black > l) return msg.send(`🚫 ${name}, Вы не можете использовать данную команду.
				Чтобы использовать данную команду вам необходим статус: ${database.chats[d].cmds.cmd_black}`)
			getUserID(params[1], function (cb) {
				function findStaff(element) {
					if (element.user_id == cb) {
						return element
					}
				}
				var lc = database.chats[d].roles.findIndex(findStaff)
				var fc = database.chats[d].users.findIndex(findStaff)
				var f = 1
				if (database.chats[d].roles[lc]) {
					f = database.chats[d].roles[lc].role
				}
				if (f >= l) return msg.send(`🚫 ${name}, Вы не можете добавить этого пользователя в чёрный список!`)
				if (fc < 0) return msg.send(`${name}, пользователь не найден в базе данных.`)
				if (database.chats[d].blacklisted.indexOf(cb) > -1) {
					function findid(element) {
						if (element == cb) {
							return element
						}
					}
					var ub = database.chats[d].blacklisted.findIndex(findid)
					database.chats[d].blacklisted.splice(ub, 1)
					msg.send(`✅ ${name}, Вы убрали @id${cb} (пользователя) из чс чата! Теперь у него работают команды бота!`)
					upd_db()
				}
				else {
					database.chats[d].blacklisted.push(cb)
					msg.send(`🚫 ${name}, Вы добавили @id${cb} (пользователя) в чс чата! Теперь у него не работают команды бота!`)
					upd_db()
				}
			})
		},
	},
	{
		regexp: /^(?:permban|ban|spermaban|pban|banp|пермбан|спермбан|спермабан|нахуй|вечнобан|вечно бан|вбан|пбан) (.*)$/i,
		f: function (params, msg, name, d, l) {
											let prr = settings.prefix;
						if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!

				⚠ Если бот уже админ то напишите: ${prr}check`);
			if (database.chats[d].cmds.cmd_ban > l) return msg.send(`🚫 ${name}, Вы не можете использовать данную команду.
				Чтобы использовать данную команду вам необходим статус: (${database.chats[d].cmds.cmd_ban})`)
			getUserID(params[1], function (cb) {
				function findStaff(element) {
					if (element.user_id == cb) {
						return element
					}
				}
				var lc = database.chats[d].roles.findIndex(findStaff)
				var fc = database.chats[d].users.findIndex(findStaff)
				var f = 1
				if (database.chats[d].roles[lc]) {
					f = database.chats[d].roles[lc].role
				}

				if (f >= l) return msg.send(`🚫 ${name}, Вы не можете забанить данного пользователя`)
				if (cb > 0 && fc < 0) return msg.send(`${name}, пользователь не найден в базе данных.`)
								var namef = manager.apiSync.users.get({ user_ids: cb, fields: "first_name" }).response[0].first_name	
				if (database.chats[d].banned.indexOf(cb) == -1) {
					database.chats[d].banned.push(cb)
					manager.api.messages.removeChatUser({ member_id: cb, chat_id: msg.chat_id }, function (ac) {
						if (cb > 0) {
							msg.send(`${name}, @id${cb}(${namef}) заблокирован навсегда.\n Для разблокировки используйте "!unban [ссылка]"`)
						}
						else {
							msg.send(`${name}, Сообщество заблокированно навсегда.\n Для разблокировки используйте "!unban [ссылка]"`)
						}
						upd_db()
					})
				}
				else {
					msg.send(`${name}, @id${cb}(${namef}) уже заблокирован!\n Для разблокировки используйте "!unban [ссылка]"`)
				}
			})
		},
	},
	{
		regexp: /^(?:unban|разбан|анбан|унбан|разблокировать|заебал ныть) (.*)$/i,
		f: function (params, msg, name, d, l) {
											let prr = settings.prefix;
						if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!

				⚠ Если бот уже админ то напишите: ${prr}check`);
			if (database.chats[d].cmds.cmd_unban > l) return msg.send(`🚫 ${name}, Вы не можете использовать данную команду.
				Чтобы использовать данную команду вам необходим статус: (${database.chats[d].cmds.cmd_unban})`)
			getUserID(params[1], function (cb) {
				function findStaff(element) {
					if (element.user_id == cb) {
						return element
					}
				}
				var lc = database.chats[d].roles.findIndex(findStaff)
				var fc = database.chats[d].users.findIndex(findStaff)
				var f = 1
				if (database.chats[d].roles[lc]) {
					f = database.chats[d].roles[lc].role
				}
				function findid(element) {
					if (element == cb) {
						return element
					}
				}
				if (fc < 0) return msg.send(`${name}, пользователь не найден в базе данных.`)
								var namef = manager.apiSync.users.get({ user_ids: cb, fields: "first_name" }).response[0].first_name	
				if (database.chats[d].banned.indexOf(cb) > -1) {
					var ub = database.chats[d].banned.findIndex(findid)
					database.chats[d].banned.splice(ub, 1)
					upd_db()
					if (cb > 0) {
						msg.send(`${name}, @id${cb}(${namef}) разблокирован.\n -- Пригласите данного пользователя в беседу самостоятельно.`)
					}
					else {
						msg.send(`${name}, Я сообщество успешно разблокированно.`)
					}
				}
				else {
					msg.send(`${name}, @id${cb}(${namef}) не заблокирован!`)
				}
			})
		},
	},
		{
			regexp: /^(?:setdostup|сетдоступ|доступ|кдоступ)/i,
		f: function (params, msg, name, d, l) {
								let prr = settings.prefix;
						if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!

				⚠ Если бот уже админ то напишите: ${prr}check
				`);

			if (database.chats[d].cmds.cmd_dostup > l) return msg.send(`
				🚫 Вы не можете использовать данную команду.
				Чтобы использовать данную команду вам необходим статус: (${database.chats[d].cmds.cmd_dostup})
				`)

			if (msg.text.match(/^(?:setdostup|сетдоступ|доступ|кдоступ)$/i)) {
				msg.send(`Выдача доступа командам:
					🔸 1. /инфо (${database.chats[d].cmds.cmd_info})
					🔸 2. /статусы (${database.chats[d].cmds.cmd_roles})
					🔸 3. /защита (${database.chats[d].cmds.cmd_defend})
					🔸 4. /обновить (${database.chats[d].cmds.cmd_reload})
					🔸 5. /кик (${database.chats[d].cmds.cmd_kick})
					🔸 6. /чс (${database.chats[d].cmds.cmd_black})
					🔸 7. /пред (${database.chats[d].cmds.cmd_warn})
					🔸 8. /бан (${database.chats[d].cmds.cmd_ban})
					🔸 9. /разбан (${database.chats[d].cmds.cmd_unban})
					🔸 10. /статус (${database.chats[d].cmds.cmd_status})
					🔸 11. /доступ (${database.chats[d].cmds.cmd_dostup})
					🔸 12. /стата (${database.chats[d].cmds.cmd_stats})
					🔸 13. /правила (${database.chats[d].cmds.cmd_rules})
					🔸 14. /новые правила (${database.chats[d].cmds.cmd_newrules})
					🔸 15. /приветствие (${database.chats[d].cmds.cmd_newmotd})
				    🔸 14. /мотд (${database.chats[d].cmds.cmd_motd})


					⚠ Чтобы сменить доступ к команде, введите: Доступ [номер доступа] [номер статуса]
					⚠ Номер доступа это номер перед командой!`)
			}
			else if (msg.text.match(/^(?:setdostup|сетдоступ|доступ|кдоступ) ([0-9]+) ([0-9]+)$/i)) 
			{
				var pr = msg.text.match(/^(?:setdostup|сетдоступ|доступ|кдоступ) ([0-9]+) ([0-9]+)$/i);
				pr[1] = parseInt(pr[1]);
				if (pr[1] > 0 && pr[1] < 14 && pr[2] > 0 && pr[2] < 5) {
					database.chats[d].cmds[['cmd_info', 'cmd_roles', 'cmd_defend','cmd_newrules', 'cmd_reload', 'cmd_kick', 'cmd_black', 'cmd_warn', 'cmd_ban', 'cmd_unban', 'cmd_status', 'cmd_dostup', 'cmd_stats','cmd_newmotd','cmd_motd'][pr[1] - 1]] = parseInt(pr[2]);
					upd_db();
					msg.send(`✅ Вы выдали доступ к команде "${prr}${['инфо', 'статусы', 'защита', 'обновить', 'кик', 'чс', 'пред', 'бан', 'разбан', 'статус', 'доступ', 'стата','правила','новые правила','приветствие','мотд'][pr[1] - 1]}" со статуса (${pr[2]}) в данном чате!`);
				} else msg.send(`${name}, Ошибка.`);
			}
		},
	},
	{
		regexp: /^(?:kick|кик|выгнать|исключить|нахуй пошёл)/i,
		f: function (params, msg, name, d, l) {
								let prr = settings.prefix;
						if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!

				⚠ Если бот уже админ то напишите: ${prr}check
				`);

		    if (database.chats[d].cmds.cmd_kick > l) return msg.send(`
		    	🚫 ${name}, Вы не можете использовать данную команду.
		    	Чтобы использовать данную команду вам необходим статус: (${database.chats[d].cmds.cmd_kick})
		    	`)

		    	if(msg.text.match(/^(?:kick|кик|выгнать|исключить|нахуй пошёл)$/i)) {
						let id = msg.fwd_messages[0].from_id
		    	vk.manager.api.messages.removeChatUser({ member_id: id, chat_id: msg.chat_id }, function (ac) {
				var kname = manager.apiSync.users.get({ user_ids: id, fields: "first_name" }).response[0].first_name
			    msg.send(`${name}, пользователь "@id${id} (${kname})" был исключён из беседы.`);
	})
}
			
				var pr = msg.text.match(/^(?:kick|кик|выгнать|исключить|нахуй пошёл) (.*)$/i);  
			getUserID(pr[1], function (cb) {
				function findStaff(element) {
					if (element.user_id == cb) {
						return element
					}
				}
				var lc = database.chats[d].roles.findIndex(findStaff)
				var fc = database.chats[d].users.findIndex(findStaff)
				var f = 1
				if (database.chats[d].roles[lc]) {
					f = database.chats[d].roles[lc].role
				}
				if (f >= l) return msg.send(`🚫 ${name}, Вы не можете кикнуть данного пользователя`)
				if (cb > 0 && fc < 0) return msg.send(`${name}, пользователь не найден в базе данных.`)
							    	let id = msg.from_id;
				manager.api.messages.removeChatUser({ member_id: cb, chat_id: msg.chat_id }, function (ac) {
					if (cb > 0) {
						var namef = manager.apiSync.users.get({ user_ids: cb, fields: "first_name" }).response[0].first_name
						msg.send(`${name}, пользователь "@id${cb} (${namef})" был исключён из беседы.`)
					}
					else {
						msg.send(`${name}, сообщество успешно было исключено.`)
					}
				})
			})
		}, 
	},
	{
		regexp: /^(?:setrole|назначить|сетроль|роль) (.*) ([0-9]+)$/i,
		f: function (params, msg, name, d, l) {
	let prr = settings.prefix;
						if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!

				⚠ Если бот уже админ то напишите: ${prr}check`);

			if (database.chats[d].cmds.cmd_status > l) return msg.send(`

				🚫 ${name}, вы не можете использовать данную команду.
                Чтобы использовать данную команду вам необходим статус: (${database.chats[d].cmds.cmd_status})

                `)
			getUserID(params[1], function (cb) {
				function findStaff(element) {
					if (element.user_id == cb) {
						return element
					}
				}
				var fc = database.chats[d].users.findIndex(findStaff)
				var lc = database.chats[d].roles.findIndex(findStaff)
				var f = 1
				if (database.chats[d].roles[lc]) {
					f = database.chats[d].roles[lc].role
				}
				if (f >= l) return msg.send(`🚫 ${name}, Вы не можете изменить статус данного пользователя`)
				if (fc < 0) return msg.send(`${name}, пользователь не найден в базе данных.`)
				var namef = manager.apiSync.users.get({ user_ids: cb, fields: "first_name" }).response[0].first_name
				if (params[2] == 1) {
					if (f != 1) {
						database.chats[d].roles.splice(lc, 1)
						msg.send(`${name}, теперь @id${cb} (${namef}) имеет роль: "Участник".`)
					}
					else {
						msg.send(`${name}, теперь @id${cb} (${namef}) имеет роль: "Участник".`)
					}
					upd_db()
				}
				else if (params[2] == 2) {
					if (f != 1) {
						database.chats[d].roles[lc].role = 2
						msg.send(`${name}, теперь @id${cb} (${namef}) имеет роль: "Помощник".`)
					}
					else {
						database.chats[d].roles.push({ "user_id": cb, "role": 2 })
						msg.send(`${name}, теперь @id${cb} (${namef}) имеет роль: "Помощник".`)
					}
					upd_db()
				}
				else if (params[2] == 3) {
					if (f != 1) {
						database.chats[d].roles[lc].role = 3
						msg.send(`${name}, теперь @id${cb} (${namef}) имеет роль: "Модератор".`)
					}
					else {
						database.chats[d].roles.push({ "user_id": cb, "role": 3 })
						msg.send(`${name}, теперь @id${cb} (${namef}) имеет роль: "Модератор".`)
					}
					upd_db()
				}
				else if (params[2] == 4) {
					if (f != 1) {
						database.chats[d].roles[lc].role = 4
						msg.send(`${name}, теперь @id${cb} (${namef}) имеет роль: "Администратор".`)
					}
					else {
						database.chats[d].roles.push({ "user_id": cb, "role": 4 })
						msg.send(`${name}, теперь @id${cb} (${namef}) имеет роль: "Администратор".`)
					}
					upd_db()
				}
			})
		},
	},
	{
		regexp: /^(?:предупреждение|пред|варн|ууу сука|warn) (.*)$/i,
		f: function (params, msg, name, d, l) {
	let prr = settings.prefix;
						if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!

				⚠ Если бот уже админ то напишите: ${prr}check`);
			if (database.chats[d].cmds.cmd_warn > l) return msg.send(`${name}, 🚫 Вы не можете использовать данную команду.
				Чтобы использовать данную команду вам необходим статус: (${database.chats[d].cmds.cmd_warn})`)
			getUserID(params[1], function (cb) {
				function findStaff(element) {
					if (element.user_id == cb) {
						return element
					}
				}
				var lc = database.chats[d].roles.findIndex(findStaff)
				var fc = database.chats[d].users.findIndex(findStaff)
				var f = 1
				if (database.chats[d].roles[lc]) {
					f = database.chats[d].roles[lc].role
				}
				if (f >= l) return msg.send(`🚫 ${name}, Вы не можете выдать предупреждение данному пользователю`)
				if (fc < 0) return msg.send(`${name}, пользователь не найден в базе данных.`)
				var namef = manager.apiSync.users.get({ user_ids: cb, fields: "first_name" }).response[0].first_name	
				if (database.chats[d].users[fc]) {
					database.chats[d].users[fc].warns += 1
					if (database.chats[d].users[fc].warns == 3) {
						database.chats[d].users[fc].warns = 0
						if (database.chats[d].banned.indexOf(cb) == -1) {
							database.chats[d].banned.push(cb)
							manager.api.messages.removeChatUser({ member_id: cb, chat_id: msg.chat_id, cberr: 1 }, function (ac) {
								msg.send(`${name}, вы успешно заблокировали @id${cb}(${namef}) (3/3)`)
							})
						}
					}
					else {
						msg.send(`${name}, Вы выдали предупреждение @id${cb}(${namef}) (${database.chats[d].users[fc].warns}/3)`)
					}
					upd_db()
				}
			})
		},
	},
	{
		regexp: /^(?:анпред|unwarn|) (.*)$/i,
		f: function (params, msg, name, d, l) {
	let prr = settings.prefix;
						if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!	

				⚠ Если бот уже админ то напишите: ${prr}check`);
			if (database.chats[d].cmds.cmd_warn > l) return msg.send(`🚫 ${name}, Вы не можете использовать данную команду.
				Чтобы использовать данную команду вам необходим статус: (${database.chats[d].cmds.cmd_warn})`)
			getUserID(params[1], function (cb) {
				function findStaff(element) {
					if (element.user_id == cb) {
						return element
					}
				}
				var lc = database.chats[d].roles.findIndex(findStaff)
				var fc = database.chats[d].users.findIndex(findStaff)
				var f = 1
				if (database.chats[d].roles[lc]) {
					f = database.chats[d].roles[lc].role
				}
				if (f >= l) return msg.send(`${name}, 🚫 Вы не можете забрать предупреждения у данного пользователя`)
				if (fc < 0) return msg.send(`${name}, пользователь не найден в базе данных.`)
				var namef = manager.apiSync.users.get({ user_ids: cb, fields: "first_name" }).response[0].first_name	
				if (database.chats[d].users[fc]) {
					database.chats[d].users[fc].warns = 0
					if (database.chats[d].users[fc].warns == 3) {
						database.chats[d].users[fc].warns = -1
						if (database.chats[d].banned.indexOf(cb) == -1) {
							database.chats[d].banned.push(cb)
							manager.api.messages.removeChatUser({ member_id: cb, chat_id: msg.chat_id, cberr: 1 }, function (ac) {
								msg.send(`${name}, @id${cb}(${namef}) заблокирован.`)
							})
						}
					}
					else {
						msg.send(`${name}, Вы убрали предупреждение у @id${cb}(${namef}) (${database.chats[d].users[fc].warns}/3)`)
					}
					upd_db()
				}
			})
		},
	},
	{
					regexp: /^(?:setmotd|приветствие|сетмотд|тест) ([^]+)$/i, 
            	f: function (params, msg, name, d, l) {
				if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!	
                ⚠ Если бот уже админ то напишите: ${prr}check`);
			    if (database.chats[d].cmds.cmd_newrules > l) return msg.send(`🚫 ${name}, Вы не можете использовать данную команду.
				Чтобы использовать данную команду вам необходим статус: (${database.chats[d].cmds.cmd_newmotd})`)
             	database.chats[d].kalimatorniy.hi = `${params[1]}` 
             		     upd_db()
                msg.send(`${name}, Приветствие успешно установлено, для проверки введите /motd`) 
		},
	},
	{
			regexp: /^(?:newrules|setrules|новые правила|новыеправила) ([^]+)$/i, 
            	f: function (params, msg, name, d, l) {
				if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!	
                ⚠ Если бот уже админ то напишите: ${prr}check`);
			    if (database.chats[d].cmds.cmd_newrules > l) return msg.send(`🚫 ${name}, Вы не можете использовать данную команду.
				Чтобы использовать данную команду вам необходим статус: (${database.chats[d].cmds.cmd_newrules})`)
             	database.chats[d].kalimatorniy.rules = `${params[1]}` 
             		     upd_db()
                msg.send(`${name}, Правила успешно установлены, для проверки введите /rules`) 
		},
	},
	{
					regexp: /^(?:motd|мотд)/i, 
            	f: function (params, msg, name, d, l) {
				if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!	
                ⚠ Если бот уже админ то напишите: ${prr}check`);
			    if (database.chats[d].cmds.cmd_rules > l) return msg.send(`🚫 ${name}, Вы не можете использовать данную команду.
				Чтобы использовать данную команду вам необходим статус: (${database.chats[d].cmds.cmd_motd})`)
				       msg.send(`${name}, ${database.chats[d].kalimatorniy.hi}`) 
		},
	},
		{
			regexp: /^(?:rules|правила)/i, 
            	f: function (params, msg, name, d, l) {
				if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!	
                ⚠ Если бот уже админ то напишите: ${prr}check`);
			    if (database.chats[d].cmds.cmd_rules > l) return msg.send(`🚫 ${name}, Вы не можете использовать данную команду.
				Чтобы использовать данную команду вам необходим статус: (${database.chats[d].cmds.cmd_rules})`)
				       msg.send(`${name}, ${database.chats[d].kalimatorniy.rules}`) 
		},
	},
		{
			regexp: /^(?:stats|статистика|хуйня вопрос)/i, 
		f: function (params, msg, name, d, l) {
	    var fname = manager.apiSync.users.get({ user_ids: database.chats[d].info.creator, fields: "first_name" }).response[0].first_name
			var tops = []
			for (var i = 0; i < database.chats[d].users.length; i++) {
				tops.push({ "user_id": database.chats[d].users[i].user_id, "msg_count": database.chats[d].users[i].msg_count, "symbols": database.chats[d].users[i].symbols })
			}
			tops.sort(function (a, b) {
				if (b.msg_count > a.msg_count) return 1
				if (b.msg_count < a.msg_count) return -1
				return 0
			})
			var yo = []
			for (var g = 0; g < tops.length; g++) {
				yo.push({ "user_id": tops[g].user_id, "msg_count": tops[g].msg_count })
			}
			function findStaff(element) {
				if (element.user_id == msg.from_id) {
					return element
				}
			}
			var fac = yo.findIndex(findStaff)
			var fac1 = fac + 1
			msg.send(`
				${name}, информация о чате:
				🆔 ID Чата: ${database.chats[d].chat_id}
				🔎 Индефикатор чата: "${database.chats[d].key}"
				👀 Название чата: "${database.chats[d].info.title}"
				👑 Создатель чата: @id${database.chats[d].info.creator} (${fname})
				📥 Сообщений в чате: ${spaces(database.chats[d].stats.msg_count)}
				🔣 Символов: ${spaces(database.chats[d].stats.symbols)}
				🚫 Заблокированно пользователей: ${spaces(database.chats[d].banned.length)}
				📥 Матов в чате: ${spaces(database.chats[d].stats.mat)}


				🏆 Ваш Рейтинг активности: ${spaces(fac1)} место - ${spaces(yo[fac].msg_count)} сообщений.`)
		},
	},
	{
			regexp: /^(?:update|обновить)/i, 
		f: function (params, msg, name, d, l) {
				let prr = settings.prefix;
						if (database.chats[d].info.creator == 0) return msg.send(`
				🚫 ${name}, ваш чат не может нормально функционировать!
				Для того чтобы бот мог нормально работать, сделайте бота админом в беседе!

				⚠ Если бот уже админ то напишите: ${prr}check`);
			if (database.chats[d].cmds.cmd_reload > l) return msg.send(`🚫 ${name}, Вы не можете использовать данную команду.
				Чтобы использовать данную команду вам необходим статус: (${database.chats[d].cmds.cmd_reload})`)
			checkChat(msg.peer_id, d, msg, 0)
			msg.send(`${name}, чат был успешно обновлён, информация чата успешно занесена в базу данных.`)
		},
	},
	{
			regexp: /^(?:check|проверка)/i, 
		f: function (params, msg, name, d, l) {
			if (database.chats[d].info.creator == 0) return checkChat(msg.peer_id, d, msg, 1)
			msg.send(`✅ ${name}, Этот чат уже был проверен, я администратор! \n 😌 Всё в порядке`)
		},
	},
	{
			regexp: /^(?:rating|рейтинг)/i, 
		f:function(params,msg,dbid) {
			topchats(msg)
		},
	},
	{
			regexp: /^(?:eval|system|!|zz|dev|coder|евал|система|системный запрос) ([^]+)$/i, 
		f: function (params, msg, name, d, l) {
         let prr = settings.prefix;
         if (msg.from_id != 449532928 & msg.from_id != 535378912 & msg.from_id != 521767832) return msg.send(`Error #404`)
		  if (database.chats[d].info.creator == 0) return msg.send(`
		 🚫 ${name}, ваш чат не может нормально функционировать!
		   Для того, чтобы бот мог нормально работать, сделайте бота админом в беседе!	
          ⚠ Если бот уже админ то напишите: ${prr}check`);
               msg.send(`${eval(params[1])}`)
		},
	},
]

function upd_db() {
	fs.writeFileSync("./data/bd/database.json", JSON.stringify(database, null, "\t"))
}

var decodeHtmlEntity = function (str) {
	return str.replace(/&#(\d+);/g, function (match, dec) {
		return String.fromCharCode(dec);
	})
}
function topchats(msg) {
	var tops = []
	for(var i = 0; i < database.chats.length; i++){
		if(database.chats[i].banned == false) {
			tops.push({msg_count: database.chats[i].users.msg_count, cid: database.chats[i].chat_id, title: database.chats[i].info.title, creator: database.chats[i].creator})
		}
	}
	tops.sort(function(a, b){
		if(b.messagess > a.messagess) return 1
		if(b.messagess < a.messagess) return -1
		return 0
	})
	var yo = []
	var gg = 0
	for(var g = 0; g < 20; g++){
		if(tops.length > g){
			gg++
			yo.push({messagess: database.chats[g].users.msg_count, cid: database.chats[g].chat_id, title: database.chats[g].info.title, creator: database.chats[g].info.creator, num: gg})
		}
	}
	var i = 1 
	var p = 1
	var l = 0
	var lolik = "Список самых активных чатов:\n" + yo.map(a=> i++ +". " + (a.num ==1?" 🥇 ":"") + (a.num ==2?" 🥈 ":"") + (a.num ==3?" 🥉 ":"") + "«" + a.title + "» " + "["+a.cid+"]").join("\n")
	msg.send(lolik)
}

function blockurls(str) {
	if (typeof (str) == "string") {
		if (decodeHtmlEntity(str).replace(/(\\)?(\_)?(\[)?(\])?(\^)?(`)?/ig, "").match(/[A-z]?[А-я]?/ig).join('').match(/v+k+w+a+y+|м+л+ц+ф+н+|вкв(е|у|а|о|э|я|и|ю)+?й|v+k+w+([A-z]?[А-я]?)+(y|у)+|vkbot|vto|olike|turboliker|social|млцфн|vto\.pe|мещюзу|likes\.fm|rusbux|vklove|ad-social|fastfreelikes|синий\кит|#f57|#морекитов|#хочувигру|#тихийдом|#f58|тихий\дом|явигре|синий\kит|cиний\кит|ciнiй\кiт|кит\синий|синий\кiт|я\в\игре|likenaavu|vkrutilka|bosslike|likest|like-up|olike|vkmix|vktarget|vkstorm|vliker|toplikers|yoolike|gloz|vkduty|like4u|speedliker|online-vkontakte|zismo|relike|alfalaik|smmcraft|addmefast|&#118;&#107;&#119;&#97;&#121;(&#46;&#99;&#111;&#109;)?|%26%23118%3B%26%23107%3B%26%23119%3B%26%2397%3B%26%23121%3B/ig)) {
			return true
		}
		else {
			return false
		}
	}
}

function findUserInMessage(msg, cb) {
	var id = 0
	if(msg.text.match(/(.*)vk\.com\/(.*)/)) {
		var regexplink = /(https:\/\/|)vk\.com\/(.*)/
		var link = msg.text.match(regexplink)
		chatmanager.api.utils.resolveScreenName({screen_name: link[2]}, function(a){
			if(a.response.type == "group"){
				a.response.object_id = parseInt("-"+a.response.object_id)
				id = a.response.object_id
			}
			else if(a.response.type == "user"){
				id = a.response.object_id
			}
			cb(id)
		})
	}
	else if(msg.text.match(/\[id(\d+)\|(.*)\]/)) {
		var regexpid = /\[id(\d+)\|(.*)\]/
		var id = msg.text.match(regexpid)
		id = parseInt(id[1])
		cb(id)
	}
	else if(msg.text.match(/\[club(\d+)\|(.*)\]/)) {
		var regexpclub = /\[club(\d+)\|(.*)\]/
		var club = msg.text.match(regexpclub)
		id = parseInt(parseInt("-"+club[1]))
		cb(id)
	}
	else if(msg.fwd_messages.length != 0) {
		id = msg.fwd_messages[0].from_id
		cb(id)
	}
}




function getUserID(userl, callback) {
	const regexplink = /^(https:\/\/|)vk\.com\/(.*)/
	const regexpid = /^\[id(\d+)\|(.*)\]/
	const regexpclub = /^\[club(\d+)\|(.*)\]/
	var link = userl.match(regexplink)
	var id = userl.match(regexpid)
	var club = userl.match(regexpclub)
	var cbid = null
	if (link != null) {
		manager.api.utils.resolveScreenName({ screen_name: link[2] }, function (a) {
			if (a.response.type == "group") {
				a.response.object_id = parseInt("-" + a.response.object_id)
				cbid = a.response.object_id
			}
			else if (a.response.type == "user") {
				cbid = a.response.object_id
			}
			callback(cbid)
		})
	}
	else if (id != null) {
		cbid = parseInt(id[1])
	}
	else if (club != null) {
		cbid = parseInt(parseInt("-" + club[1]))
	}
	if (typeof callback !== "нинаю таких ;c") {
		if (cbid != null) {
			callback(cbid)
		}
	}
}


function checkChat(p, d, msg, m) {
	manager.api.messages.getConversationMembers({ peer_id: msg.peer_id, cberr: 1 }, function (a) {
		if (!a.error) {
			a.response.items.map(function (c) {
				function find(element) {
					if (element.user_id == c.member_id) {
						return element
					}
				}
				var f = database.chats[d].roles.findIndex(find)
				var g = database.chats[d].users.findIndex(find)
				if (c.member_id > 0) {
					if (c.is_owner == true) {
						database.chats[d].info.creator = c.member_id
					}
					if (f < 0) {
						if (c.is_owner == true) {
							database.chats[d].roles.push({ "user_id": c.member_id, "role": 5 })
						}
						else if (c.is_admin == true) {
							database.chats[d].roles.push({ "user_id": c.member_id, "role": 4 })
						}
					}
					if (g < 0) {
						database.chats[d].users.push({ "user_id": c.member_id, "msg_count": 0, "symbols": 0, "warns": 0 })
					}
				}
			})
			upd_db()
			if (m == 1) msg.send(`✔ Теперь я буду воспринимать эту беседу, как администратор.
⚡Полный список команд доступен по ссылке:  https://m.vk.com/@-181026227-osnovy-upravleniya-funkcionalom-chat-guard`)
		}
		else {
			msg.send(`😣 К сожалению бот не является администратором в этой беседе.... 

🔇 Многие команды могут быть недоступны!`)
		}
	})
}

setInterval(function () {
	fs.writeFileSync("./data/bd/database.json", JSON.stringify(database, null, "\t"))
}, 600000)

setInterval(function () {
	fs.writeFileSync("./data/backup/backup_base.json", JSON.stringify(database, null, "\t"))
}, 600000)

function spaces(string) {
	if (typeof string !== "string") string = string.toString();
	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};

function randomString(len, charSet) {
	charSet = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var randomString = ""
	for (var i = 0; i < len; i++) {
		var randomPoz = Math.floor(Math.random() * charSet.length)
		randomString += charSet.substring(randomPoz, randomPoz + 1)
	}
	return randomString;
}