const Discord = require("discord.js")
module.exports = {
  cooldown:5,

 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
  const embed = new Discord.MessageEmbed()
    .setTitle(MESSAGES_JSON[LANG].MESSAGE_HELP_EMBED_TITLE)
    .setDescription(MESSAGES_JSON[LANG].MESSAGE_HELP_EMBED_DESCRIPTION)

    .addField(
      MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_NAME_1,
      MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_1
    )
     .addField(MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_NAME_3, MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_33)
    .addField(MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_NAME_2, MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_2)
    .setImage("https://cdn.glitch.com/74b23a81-0966-474f-a202-65aae82d8499%2Fsydxgbot.gif")
    .setColor("#8B0000")
  const tresembed = new Discord.MessageEmbed() //Defines el embed del 2º emoji
    .setTitle(MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_NAME_1)
     .addField("Duel", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_3)//duel
    .addField("Buy", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_5)//duel
      .addField("Store", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_10)//duel
     .addField("Inventory", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_16)//duel
     
 .setColor("#8B0000")
    
  const cuatroembed = new Discord.MessageEmbed() 
    .setTitle(MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_NAME_3)
   
     .addField("Balance", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_4)//reward
    .addField("Vote", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_8)//reward
    .addField("Daily", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_6)//reward
    .addField("Weekly", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_7)//reward
    .addField("Monthly", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_9)//reward
    .addField("Cooldown", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_15)//reward
    .addField("Remind", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_17)//reward
  
    .setColor("#8B0000")
    
    const cincoembed = new Discord.MessageEmbed()
     .setTitle(MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_NAME_2)
    .addField("Setlang", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_18)//others
      .addField("Setprefix", MESSAGES_JSON[LANG].MESSAGES_HELP_FIELD_NAME_20)
    .addField("Invite", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_NAME_19)//others
     .addField("Ping", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_11 )//others
    .addField("Bot", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_12)//others
    .addField("React", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_13)//others
    .addField("Avatar", MESSAGES_JSON[LANG].MESSAGES_HELP_EMBED_FIELD_VALUE_14)//others
    .addField("Reportbug", MESSAGES_JSON[LANG].MESSAGES_HELP_FIELD_NAME_21)
  
    .setColor("#8B0000")
  message.channel.send(embed).then(msg => {
   
    msg.react("📢");
    msg.react("⚔️")
    msg.react("💰");
    msg.react("⚙");
 
  
    msg.awaitReactions((reaction, user)  => {
    
    
      if (message.author.id !== user.id) return;
      if (reaction.emoji.name === "📢") {
        if(message.member.guild.me.hasPermission("MANAGE_MESSAGES")){
        reaction.users.remove(user.id);

      }
        msg.edit(embed);
        
      }

      if (reaction.emoji.name === "⚔️") {
        if(message.member.guild.me.hasPermission("MANAGE_MESSAGES")){
        reaction.users.remove(user.id);
        }
        msg.edit(tresembed);
       
      }
        //Lo que hara el primer emoji afectara al primer embed
        if (reaction.emoji.name === "💰") {
           if(message.member.guild.me.hasPermission("MANAGE_MESSAGES")){
          reaction.users.remove(user.id);
           }
          msg.edit(cuatroembed);
     
        }
    if (reaction.emoji.name === "⚙") {
       if(message.member.guild.me.hasPermission("MANAGE_MESSAGES")){
          reaction.users.remove(user.id);
       }
          msg.edit(cincoembed);
     
        }
      
    });
  });



}
}
