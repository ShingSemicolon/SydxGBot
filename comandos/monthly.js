
const ms = require('ms')
const Discord = require('discord.js')
let cooldownModel = require("../db/models/cooldown.js");
let economyModel = require("../db/models/economy.js");
module.exports = {
  cooldown:5,

 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {


    let timeout = 2592000000 
    let amount = Math.floor(Math.random() * 200) + 50;
let cooldown = await cooldownModel.findOne({userID: message.author.id})
     let balance = await economyModel.findOne({userID: message.author.id})
      if(!cooldown)cooldown= await cooldownModel.create({
      userID:message.author.id,
      vote:0,
      daily:0,
      weekly:0,
      monthly:0
      })
      if(!balance) balance = await economyModel.create({
      userID:message.author.id,
      money: 0
    })      
    
    let bal = balance.money
    if (cooldown.monthly !== null && timeout - (Date.now() - cooldown.monthly) > 0) {
        let time = timeout - (Date.now() - cooldown.monthly)
                  var ms = time % 1000;
       s = (time - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
       var mins = s % 60;
       s = (s - mins) / 60;
       var hrs = s % 24
     var days = (s - hrs) / 24
      

        message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_MONTHLY_EMBED_ALREADY_DESCRIPTION+`**${days}d ${hrs}h ${mins}m ${secs}s**`).setColor("RED"))
     } else {
            balance.money += amount
       await balance.save()
         cooldown.monthly = Date.now()
         await cooldown.save()
   let embed = new Discord.MessageEmbed()
.setTitle(MESSAGES_JSON[LANG].MESSAGE_MONEY_EMBED_TITLE)

      .setColor("#8B0000")
      .setAuthor(message.author.username,message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`**`+ MESSAGES_JSON[LANG].MESSAGE_MONTHLY_EMBED_DESCRIPTION +`**\n`+ `+${amount}<:SydxGRubi:818489981282025532>`+` \n` +MESSAGES_JSON[LANG].MESSAGE_MONEY_EMBED_DESCRIPTION_2 +`${balance.money + amount}<:SydxGRubi:818489981282025532> `)
        .setThumbnail(client.user.displayAvatarURL({size: 2048, dynamic:true}))
    message.channel.send(embed)
    
    db.set(`monthly_${message.author.id}`, Date.now())
        
    }

}
}