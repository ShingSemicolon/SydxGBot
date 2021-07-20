let reactModel = require("../db/models/react.js");
const Discord = require("discord.js")
module.exports = {
  cooldown:5,
  aliases: ["r"],
 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
   let react = await reactModel.findOne({guildID: message.guild.id})
   if(!react) react = await reactModel.create({
     guildID: message.guild.id,
     reaction: true
   })
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_ONLY_ADMINS_EMBED_DESCRIPTION).setColor("RED"))
  
  if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_REACT_EMBED_DESCRIPTION).setColor("#8B0000"))
  
  let react1;
  console.log(react.reaction)
  if(args[0] === "off") {
    if(!
    react.reaction) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_REACT_EMBED_ALREADY_DISABLED_DESCRIPTION).setColor("RED"))
   react.reaction = false
    await react.save()
    message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_REACT_EMBED_DISABLED_DESCRIPTION).setColor("#8B0000"))
  } else {
if(args[0] === "on") {
 if(react.reaction) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_REACT_EMBED_ALREADY_ENABLED_DESCRIPTION).setColor("RED"))

react.reaction = true
    await react.save()
message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_REACT_EMBED_ENABLED_DESCRIPTION).setColor("#8B0000"))
}

  }

}}