const mongoose = require('mongoose');
const Discord = require('discord.js');
module.exports = {
  cooldown:5,
  aliases: ["pong"],
 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
 
 
  if (message.channel.type === "dm") return
let ping = Math.floor(client.ws.ping);
const date = Date.now();
const ping_db = await new Promise((r, j) => {
    mongoose.connection.db.admin().ping((err, result) => (err || !result) ? j(err || result) : r(Date.now() - date));
});

const embed = new Discord.MessageEmbed()

.setDescription(MESSAGES_JSON[LANG].MESSAGE_PING_EMBED_DESCRIPTION_1+`${ping} ms.\n`+MESSAGES_JSON[LANG].MESSAGE_PING_EMBED_DESCRIPTION_2+`${Date.now() - message.createdTimestamp} ms\nDatabase ping: ${ping_db}`)

.setThumbnail(client.user.displayAvatarURL())
.setColor("8B0000")

message.channel.send(embed)

   

}
}