module.exports = {
  cooldown: 5,
  aliases:["botinfo"],

  async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
    const Discord = require("discord.js");
    const os = require('os-utils');

const osu = require('node-os-utils');
const { stripIndents } = require('common-tags');

const os2 = require('os');
const freeRAM = os2.freemem();
		const usedRAM = os2.totalmem() - freeRAM;
		const full = '▰';
		const empty = '▱';
		const diagramMaker = (used, free) => {
			const total = used + free;
			used = Math.round((used / total) * 10);
			free = Math.round((free / total) * 10);
			return full.repeat(used) + empty.repeat(free);
		};

		let cpuUsage;

		const p1 = osu.cpu.usage().then((cpuPercentage) => {
			cpuUsage = cpuPercentage;
		});

		await Promise.all([p1]);


    const embed = new Discord.MessageEmbed()
      .setColor("8B0000")

      .setThumbnail(client.user.displayAvatarURL(), client.user.avatarURL())
      .setTitle(MESSAGES_JSON[LANG].MESSAGE_BOT_EMBED_TITLE)
      .addField(MESSAGES_JSON[LANG].MESSAGE_BOT_EMBED_FIELD_NAME_1, '> `Shing_XD_0602#4870`')
      .addField(MESSAGES_JSON[LANG].MESSAGE_BOT_EMBED_FIELD_NAME_2, "> ` Beta 0.1.73`")
      .addField(MESSAGES_JSON[LANG].MESSAGE_BOT_EMBED_FIELD_NAME_3, '> ` 02/10/2019`')

      .addField(MESSAGES_JSON[LANG].MESSAGE_BOT_EMBED_FIELD_NAME_5, "> `" + os.platform() + "`")
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
      .addField(MESSAGES_JSON[LANG].MESSAGE_BOT_EMBED_FIELD_NAME_6, '> `Discord 12.4.0 (Js)`')
      .addField(MESSAGES_JSON[LANG].MESSAGE_BOT_EMBED_FIELD_NAME_7, '> `' + `${client.guilds.cache.size}` + '`')

      .addField(
        MESSAGES_JSON[LANG].MESSAGE_BOT_EMBED_FIELD_NAME_8,
        '> `' + `${client.users.cache.size.toLocaleString()}` + '`',
      )
	.addField(MESSAGES_JSON[LANG].MESSAGE_BOT_EMBED_FIELD_NAME_10, stripIndents`
                RAM: ${diagramMaker(usedRAM, freeRAM)} [${Math.round(100 * usedRAM / (usedRAM + freeRAM))}%]\n ${(usedRAM / 1024 / 1024 / 1024).toFixed(2)} GB / ${(os2.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
                ${MESSAGES_JSON[LANG].MESSAGE_BOT_EMBED_FIELD_NAME_4} ${diagramMaker(cpuUsage, 100 - cpuUsage)} [${Math.round(cpuUsage)}%]`, false)
			.addField('CPU', stripIndents`
                ${os2.cpus()[0].model} (${osu.cpu.count()} Cores)`, false)
     // .addField(
        // MESSAGES_JSON[LANG].MESSAGE_BOT_EMBED_FIELD_NAME_9,
        // '> `' + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB` + '`' ,
      // );

    message.channel.send(embed);
  }
}
// let emoji = bot.e