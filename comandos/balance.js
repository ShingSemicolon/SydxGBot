const Discord = require('discord.js')
const db = require('quick.db')
let economyModel = require("../db/models/economy.js");
module.exports = {
  cooldown:5,
  aliases:["bal", "bank"],
 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
let user = message.mentions.users.first() || message.author
    let balance = await economyModel.findOne({userID: user.id})
    let bal = balance ? balance.money : 0
let embed = new Discord.MessageEmbed()
      .setDescription(MESSAGES_JSON[LANG].MESSAGE_BALANCE_EMBED_DESCRIPTION +bal+ "<:SydxGRubi:818489981282025532>")
      .setColor("#8B0000")
      .setThumbnail(user.displayAvatarURL({size: 2048, dynamic:true}))

if(LANG === "ES"){
embed.setTitle(MESSAGES_JSON["ES"].MESSAGE_BALANCE_EMBED_TITLE+user.username)
} else if(LANG === "EN"){
embed.setTitle(user.username+MESSAGES_JSON["EN"].MESSAGE_BALANCE_EMBED_TITLE)
}

      

    message.channel.send(
      embed
    )
}
}
