const Discord = require("discord.js")
module.exports = {
 cooldown:5,
 aliases: ["rb", "bugreport", "br"],
 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
 
  if(!args.join(" ")) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_BUG_EMBED_DESCRIPTION_WITHOUT_ARGS).setColor("RED"))
 
  message.channel.send(new Discord.MessageEmbed().setTitle(MESSAGES_JSON[LANG].MESSAGE_BUG_EMBED_TITLE).setDescription(`${args.join(" ")}`).setFooter(MESSAGES_JSON[LANG].MESSAGE_BUG_EMBED_FOOTER).setColor("#8B0000")).then(msg => {
   
    msg.react("✅")
    msg.react("❎")

 
  
  msg.awaitReactions(async (reaction, user) => {

     

      if (message.author.id !== user.id) return;
      if (reaction.emoji.name === "✅") {
         if(message.member.guild.me.hasPermission("MANAGE_MESSAGES")){
        reaction.users.remove(user.id);
        await msg.reactions.removeAll()
        msg.edit(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_BUG_EMBED_DESCRIPTION_CONFIRM).setFooter(MESSAGES_JSON[LANG].MESSAGE_BUG_EMBED_FOOTER_CONFIRM).setColor("#8B0000"));
         client.channels.resolve("745700837824921710").send(new Discord.MessageEmbed().setTitle("Alguien acaba de reportar un nuevo bug").addField("Contenido", args.join(" ")))
         } else {
         msg.delete()
        msg.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_BUG_EMBED_DESCRIPTION_CONFIRM).setFooter(MESSAGES_JSON[LANG].MESSAGE_BUG_EMBED_FOOTER_CONFIRM).setColor("#8B0000"));
         client.channels.resolve("745700837824921710").send(new Discord.MessageEmbed().setTitle("Alguien acaba de reportar un nuevo bug").addField("Contenido", args.join(" ")))
         }
      }

      if (reaction.emoji.name === "❎") {
        if(message.member.guild.me.hasPermission("MANAGE_MESSAGES")){
        reaction.users.remove(user.id);
        await msg.reactions.removeAll()
        return msg.edit(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_BUG_EMBED_TITLE_DENIED).setColor("RED"))
       
      }else{
        msg.delete()
return msg.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_BUG_EMBED_TITLE_DENIED).setColor("RED"))
      }
      }

 }, { errors: ["time"], max: 1, time: 60000 }).catch(async (err) => {
      msg.delete()          
                
                })
                })
}
 }