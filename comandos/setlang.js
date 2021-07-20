const Discord = require('discord.js')
  let langModel = require("../db/models/lang.js");
module.exports = {
  cooldown:5,
aliases: ["setlanguage"],
 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
  //  const lang = new db.table('LANGUAGE');
   //if(message.author.id !== "525315362779299851")return
 
   
let lan = await langModel.findOne({userID: message.author.id})
   if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_SETLANG_EMBED_DESCRIPTION).setColor("#8B0000"))
  //MESSAGE_SETLANG_EMBED_DESCRIPTION

  let lang1;
  
  if(args[0].toLowerCase() === "es") {
    if(LANG === "ES") return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON["ES"].MESSAGE_EMBED_ALREADY_LANG_DESCRIPTION).setColor("RED"))//MESSAGE_EMBED_ALREADY_LANG_DESCRIPTION
       if(!lan) model = await  langModel.create({
userID:message.author.id,
lang: "ES"

    })
lan.lang = "ES"
await lan.save()
  
    message.channel.send(new Discord.MessageEmbed().setDescription( MESSAGES_JSON["ES"].MESSAGE_EMBED_ENABLED_DESCRIPTION).setColor("#8B0000"))
  } else if(args[0].toLowerCase() === "en") {
 if(LANG === "EN") return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON["EN"].MESSAGE_EMBED_ALREADY_LANG_DESCRIPTION).setColor("RED"))
      if(!lan) model = await  langModel.create({
userID:message.author.id,
lang: "EN"

    })
lan.lang = "EN"
await lan.save()
message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON["EN"].MESSAGE_EMBED_ENABLED_DESCRIPTION).setColor("#8B0000"))
}
 



 }
}