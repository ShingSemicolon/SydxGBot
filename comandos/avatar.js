
module.exports = {
  cooldown:5,
aliases:["av", "icon"],
 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
  const Discord = require("discord.js");
  let miembro = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!miembro) {
    const embed = new Discord.MessageEmbed()
      .setDescription(MESSAGES_JSON[LANG].MESSAGE_AVATAR_EMBED_DESCRIPTION+`(${message.author.displayAvatarURL({size: 2048, dynamic: true, format: 'png'})})`)
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setImage(
        `${message.author.displayAvatarURL({ size: 2048, dynamic: true })}`
      )
      .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()

      .setColor("#8B0000")
    message.channel.send(embed);
  } else {
    const embed = new Discord.MessageEmbed()
      .setDescription(MESSAGES_JSON[LANG].MESSAGE_AVATAR_EMBED_DESCRIPTION+`(${miembro.user.displayAvatarURL({size: 2048, dynamic: true, format: 'png'})})`)
      .setImage(`${miembro.user.displayAvatarURL({ size: 2048, dynamic: true })}`)
  .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
         .setColor("#8B0000")
         if(LANG === "ES"){
embed.setTitle(MESSAGES_JSON["ES"].MESSAGE_AVATAR_EMBED_AUTHOR+miembro.user.tag)
} else if(LANG === "EN"){
embed.setTitle(miembro.user.tag+MESSAGES_JSON["EN"].MESSAGE_AVATAR_EMBED_AUTHOR)
}
    message.channel.send(embed);
  }
 }
}