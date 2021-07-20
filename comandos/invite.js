const Discord = require("discord.js")
module.exports = {
  cooldown:5,
  alias:["inv"],
  async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
    message.channel.send(new Discord.MessageEmbed().setTitle(MESSAGES_JSON[LANG].MESSAGE_INVITE_EMBED_TITLE).setDescription(MESSAGES_JSON[LANG].MESSAGE_INVITE_EMBED_DESCRIPTION).setFooter(MESSAGES_JSON[LANG].MESSAGE_INVITE_EMBED_FOOTER).setColor("#8B0000"))
  }
}