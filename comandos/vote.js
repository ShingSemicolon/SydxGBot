const ms = require('ms')
const Discord = require('discord.js')

module.exports = {
  cooldown:5,

 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
return message.channel.send(MESSAGES_JSON[LANG].MESSAGE_ERROR_NO_AVAILABLE)
  
  const DBL = require("dblapi.js");
const dbl = new DBL(process.env.TOPGG_TOKEN, client);
let hasvoted = await dbl.hasVoted(message.author.id)
if(!hasvoted) {
let embed1 = new Discord.MessageEmbed()

    .setTitle(MESSAGES_JSON[LANG].MESSAGE_VOTE_EMBED_NOTVOTE_TITLE+`${message.author.username}!`)
    .setColor("8B0000")
    .setDescription(MESSAGES_JSON[LANG].MESSAGE_VOTE_EMBED_NOTVOTE_DESCRIPTION)
   .setThumbnail(message.author.displayAvatarURL({size: 2048, dynamic:true}))

    message.channel.send(embed1)

} else {

    let timeout = 43200000 
    let amount = Math.floor(Math.random() * 100) + 200;
    

    let vote = await db.fetch(`vote_${message.author.id}`);

    if (vote !== null && timeout - (Date.now() - vote) > 0) {
        let time = ms(timeout - (Date.now() - vote));

        message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_VOTE_EMBED_ALREADY_DESCRIPTION+`**${time.hours}h ${time.minutes}m ${time.seconds}s**`).setColor("RED"))
} else {
       await economy.add(`money_${message.author.id}`, amount)
          let total =await economy.get(`money_${message.author.id}`, amount)
    let embed = new Discord.MessageEmbed()
.setTitle(MESSAGES_JSON[LANG].MESSAGE_MONEY_EMBED_TITLE)

      .setColor("#8E1600")
    .setDescription(MESSAGES_JSON[LANG].MESSAGE_VOTE_EMBED_DESCRIPTION_2+`\n**`+MESSAGES_JSON[LANG].MESSAGE_VOTE_EMBED_DESCRIPTION+`**\n +${amount}<:SydxGRubi:818489981282025532> \n `+MESSAGES_JSON[LANG].MESSAGE_MONEY_EMBED_DESCRIPTION_2+` ${total}<:SydxGRubi:818489981282025532> `)
        .setThumbnail(message.author.displayAvatarURL({size: 2048, dynamic:true}))
         .setFooter(client.user.username)
    .setTimestamp()
    message.channel.send(embed)
   
    db.set(`vote_${message.author.id}`, Date.now())
        
    }
}
}
}