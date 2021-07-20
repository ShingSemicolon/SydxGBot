let ms = require("ms")
const Discord = require("discord.js")
let cooldownModel = require("../db/models/cooldown.js");
module.exports = {
  cooldown: 5,
  aliases:["cd"],
  async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
     let cooldown = await cooldownModel.findOne({userID: message.author.id})
      if(!cooldown) cooldown = await cooldownModel.create({
      userID:message.author.id,
      vote:0,
      daily:0,
      weekly:0,
      monthly:0
      })
     
     
    let msVote = 43200000 - (Date.now() - cooldown.vote)
    if(msVote <= 0) msVote = 0
    let s;
      var msV = msVote % 1000;
       s = (msVote - msV) / 1000;
        var secsV = s % 60;
        s = (s - secsV) / 60;
       var minsV = s % 60;
       s = (s - minsV) / 60;
       var hrsV = s % 24

    let msDaily = 86400000 - (Date.now() - cooldown.daily)
      if(msDaily <= 0) msDaily = 0
      
            var msD = msDaily % 1000;
       s = (msDaily - msD) / 1000;
        var secsD = s % 60;
        s = (s - secsD) / 60;
       var minsD = s % 60;
       s = (s - minsD) / 60;
       var hrsD = s % 24
    
   
    let msWeekly = 604800000 - (Date.now() - cooldown.weekly)
      if(msWeekly <= 0) msWeekly = 0
          var msW = msWeekly % 1000;
       s = (msWeekly - msW) / 1000;
        var secsW = s % 60;
        s = (s - secsW) / 60;
       var minsW = s % 60;
       s = (s - minsW) / 60;
       var hrsW = s % 24
       var daysW = (s - hrsW) / 24

   let msMonthly = 2592000000 - (Date.now() - cooldown.monthly)
     if(msMonthly <= 0) msMonthly = 0
        var msM = msMonthly % 1000;
       s = (msMonthly - msM) / 1000;
        var secsM = s % 60;
        s = (s - secsM) / 60;
       var minsM = s % 60;
       s = (s - minsM) / 60;
       var hrsM = s % 24
       var daysM = (s - hrsM) / 24

     let embed = new Discord.MessageEmbed()
     if(LANG === "ES"){
embed.setTitle(MESSAGES_JSON["ES"].MESSAGE_COOLDOWN_EMBED_TITLE)
.addField("Vote", `Falta: `+"`"+`${hrsV}h ${minsV}m ${secsV}s`+"`")
.addField("Daily", `Falta: `+"`"+`${hrsD}h ${minsD}m ${secsD}s`+"`")
.addField("Weekly", `Falta: `+"`"+`${daysW}días ${hrsW}h ${minsW}m ${secsW}s`+"`")
.addField("Monthly",`Falta: `+"`"+`${daysM}días ${hrsM}h ${minsM}m ${secsM}s`+"`")
.setColor("#8B0000")
     }else if(LANG === "EN"){
       embed.setTitle(MESSAGES_JSON["EN"].MESSAGE_COOLDOWN_EMBED_TITLE)
.addField("Vote","`"+`${hrsV}h ${minsV}m ${secsV}s`+"` away")
.addField("Daily", "`"+`${hrsD}h ${minsD}m ${secsD}s`+"` away")
.addField("Weekly", "`"+`${daysW}días ${hrsW}h ${minsW}m ${secsW}s`+"` away")
.addField("Monthly","`"+`${daysM}días ${hrsM}h ${minsM}m ${secsM}s`+"` away")
.setColor("#8B0000")
     }
message.channel.send(embed)

  }
}