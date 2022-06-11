const cmd = {
	start: /^(?:\/|\!)(?:помощь|хелп)$/i,
	check: /^(?:\/|\!)(?:чек|check)$/i,
	info: /^(?:\/|\!)(?:инфо|info)$/i,
	admins: /^(?:\/|\!)(?:состав|structure|admins|админы)$/i,
	ban: /^(\/|\!)(?:бан|ban|уебать)/i,
	unban: /^(\!|\!)(?:разбан|unban|выебать)/i,
	kick: /^(\/|\!)(?:кик|kick|(?:е|ё)бнуть)/i,
	setadm: /^(\/|\!)(?:админ|admin|adm|адм)/i,
	unsetadm: /^(\/|\!)(?:снятьадмин|unadmin|unadm|снятьадм)/i,
	setmod: /^(\/|\!)(?:модер|moder|мод|mod)/i,
	unsetmod: /^(\/|\!)(?:снятьмодер|unmoder|снятьмод|unmod)/i,
};

/*
	cmd.check (!чек | !check) - разморожение Чата
	cmd.info (!инфо | !info) - информация о Чате.
	cmd.admins (!состав | !structure | !admins | !админы) - состав чата (админ, создатель)
	cmd.ban (!бан | !ban | !убеать) - уебать (забанить) игрока.
	cmd.unban (!разбан | !unban | !выебать) - выебать (разбанить) игрока.
	cmd.kick (!кик | !kick | !ебнуть ) - ёбнуть (кикнуть) из Чата.
	cmd.setadm (!админ | !admin | !adm | !адм) - выдать админку в Чате.
	cmd.unsetadm (!снятьадмин | !unadmin | !unadm | !снятьадм) - снят админку в Чате.
	cmd.setmod (!модер | !moder | !mod | !мод) - выдать модерку в Чате.
	cmd.unsetmod (!снятьадмин | !unadmin | !unadm | !снятьадм) - снят модерку в Чате.
*/

module.exports = { cmd };