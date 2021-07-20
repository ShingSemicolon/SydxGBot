const Discord = require("discord.js")
let prefixModel = require("../db/models/prefix.js");
module.exports ={
  cooldown:5,
  async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
     if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_ONLY_ADMINS_EMBED_DESCRIPTION).setColor("RED"))
    // let table = new db.table("prefix")
    // let prefix = table.get(message.guild.id) || "&"
   
    if(!args.join(" ")) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_SETPREFIX_EMBED_DESCRIPTION_WITHOUT_ARGS).setColor("RED"))
     let prefi = await prefixModel.findOne({guildID: message.guild.id})
   
    let prefix = prefi ? prefi.prefix : "&"
    if(args.join(" ") === prefix) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_SETPREFIX_EMBED_DESCRIPTION_EQUAL).setColor("RED"))
    if(args.join(" ").length >= 6) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_SETPREFIX_EMBED_DESCRIPTION_ARGS_5).setColor("RED"))
    message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_SETPREFIX_EMBED_DESCRIPTION +args.join(" ")+"`").setColor("#8B0000"))
    if(!prefi) model = await  prefixModel.create({
      guildID:  message.guild.id,
prefix: args.join(" ")
    })
prefi.prefix = args.join(" ")
await prefi.save()

    // await table.set(message.guild.id, args.join(" "))
  }
}