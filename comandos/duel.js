const fightHistory = new Map()
let economyModel = require("../db/models/economy.js");
let weaponModel = require("../db/models/weapon.js");
let equipmentModel = require("../db/models/equipment.js");
module.exports = {
  cooldown: 5,

  async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
    const Discord = require("discord.js")
let opponent = message.mentions.users.first()
    if (!opponent) {
     return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_MENTION).setColor("RED"))
    } else if (opponent.bot) {
      return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_MENTION_BOT).setColor("RED"))
    }
    if(message.author.id === opponent.id) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_MENTION_YOURSELF).setColor("RED"))
   let weapon = await weaponModel.findOne({userID: opponent.id})
 if(!weapon) weapon = await weaponModel.create({
      userID:opponent.id,
      weapons: ["dagger"]
      })
  weapon = await weaponModel.findOne({userID: message.author.id})
 if(!weapon) weapon = await weaponModel.create({
      userID:message.author.id,
      weapons: ["dagger"]
      })
    if (fightHistory.has(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_ALREADY_BATTLE).setColor("RED"))
    if (fightHistory.has(opponent.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_ALREADY_YOURSELF_BATTLE).setColor("RED"))
   message.channel.send(new Discord.MessageEmbed().setDescription("`" + message.author.username + "`" + MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_CHALLENGES).setColor("8B0000")).then(async m => {
      m.react('✅')
      m.react('❎')
      let time = setTimeout(async () => {
         if (message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) {
          m.edit(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_TIMEOUT).setColor("RED"))
       
            } else {
              m.delete()
              m.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_TIMEOUT).setColor("RED"))
            }
        m.edit(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_TIMEOUT).setColor("RED"))
         m.reactions.removeAll()
      }, 60000);
      m.awaitReactions(async (reaction, user) => {
        if (user.id !== opponent.id) return;
        if (reaction.emoji.name === '✅') {
          clearTimeout(time)
          let embedXD = new Discord.MessageEmbed().setColor("8B0000")
          if(LANG === "ES"){
          embedXD.setDescription("¡Qué comienze el duelo! Comienza `" + opponent.username+"`")
          }else if(LANG === "EN"){
            embedXD.setDescription("Let the duel begin! `" + opponent.username+"` begins")
          }
            if (message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) {
          m.edit(embedXD)
          m.reactions.removeAll()
            } else {
              m.delete()
              m.channel.send(embedXD)
            }
          let authorArms = await weaponModel.findOne({userID: message.author.id})
 
          let opponentArms = await weaponModel.findOne({userID: opponent.id})
          message.author.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DM_1 + authorArms.weapons.join(", ")+"`"+`\n`+MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DM_2+`(${m.url})`).setColor("#8B000")).catch(err => {
            message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DM_1 + authorArms.weapons.join(", ")+"`").setColor("#8B000"))
          })
          opponent.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DM_1 + opponentArms.weapons.join(", ")+"`"+`\n`+MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DM_2+`(${m.url})`).setColor("#8B0000")).catch(err => {
            message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DM_1 + opponentArms.weapons.join(", ")+"`").setColor("#8B0000"))
          })
          fightHistory.set(opponent.id, { life: 100 });
          fightHistory.set(message.author.id, { life: 100 })
          await loopFight(message, opponent, "opponent")
          async function loopFight(message, opponent, turn) {
            var fightFinish = false
            let _contricant = fightHistory.get(opponent.id);
            let _user = fightHistory.get(message.author.id);
  
            if (_contricant.life == 0) {
              let balance = await economyModel.findOne({userID: message.author.id})
              if(!balance) model = await economyModel.create({
              userID:message.author.id,
               money: 0
    })
              
               balance.money += 100
                await balance.save()
              await fightHistory.delete(opponent.id);
              await fightHistory.delete(message.author.id)
              
              return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author.username} `+MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_WON).setColor("#8B0000"))
              fightFinish = true
            }
            if (_user.life == 0) {
                      let balance = await economyModel.findOne({userID: opponent.id})
              if(!balance) model = await economyModel.create({
              userID:opponent.id,
               money: 0
    })
              
                 balance.money += 100
                await balance.save()
              await fightHistory.delete(opponent.id);
              await fightHistory.delete(message.author.id)
            
              return message.channel.send(new Discord.MessageEmbed().setDescription(`${opponent.username} `+MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_WON).setColor("#8B0000"))
              fightFinish = true
            }
            if (turn == "opponent") {
              try {
                
      let weapon = await weaponModel.findOne({userID: opponent.id})
      if(!weapon) model = await weaponModel.create({
      userID:opponent.id,
      weapons: ["dagger"]
      })

                let messages = await message.channel.awaitMessages((m) => m.author.id === opponent.id && weapon.weapons.includes(m.content.toLowerCase()), { errors: ["time"], max: 1, time: 60000 }).catch(async (err) => {
                
                  if (fightFinish === false) {
                  await  fightHistory.delete(opponent.id);
                  await  fightHistory.delete(message.author.id);
                    return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_AWAITMESSAGES).setColor("RED"))
                  }
                
                })
           
                messages = messages.array();
                let msg = messages[0];
                const messageContent = msg.content.toLowerCase()
                if (weapon.weapons.some(item => messageContent.includes(item))) {
                 
                  let damage = Math.floor(Math.random() * 20) + 10;
    let err2;
          let equipment = await equipmentModel.findOne({userID: message.author.id})
      if(!equipment) equipment = await equipmentModel.create({
      userID:message.author.id,
    shield: {
      equip: false,
      obtained:false,
 },
  equip: false
    })

     if(equipment.equip === true) {
       err2= Math.floor(Math.random()*100)
     } else {
       err2= 0
     }
     if(err2 >= 70) {
     
       if(LANG === "ES"){
       message.channel.send(new Discord.MessageEmbed().setDescription("¡"+MESSAGE_DUEL_EMBED_DESCRIPTION_FAIL_1 + +"¡"+opponent.toString()+MESSAGE_DUEL_EMBED_DESCRIPTION_FAIL_2).setColor("RED"))
       }else if(LANG === "EN"){
message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGE_DUEL_EMBED_DESCRIPTION_FAIL_1 +opponent.toString() + MESSAGE_DUEL_EMBED_DESCRIPTION_FAIL_2).setColor("RED"))
       }
     }else{
                     if (messageContent === "axe") {
                       _user.life -= damage;
 if(_user.life < 0) _user.life = 0
                       if(_contricant.life < 0) _contricant.life = 0
 
                      const hacha2 = ["https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(7).gif?v=1601317279299"]
                      let hacha = hacha2[Math.floor(hacha2.length * Math.random())];
                      
                      const embed1 = new Discord.MessageEmbed()
                        .setDescription(`${opponent}, `+MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DAMAGE+ damage +MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DAMAGE_AXE+ `\n` + opponent.username +MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_LIFE + _contricant.life + "\n " + message.author.username + MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_LIFE + _user.life)
                        .setColor("#8B0000")
                        .setImage(hacha)
                       
                      message.channel.send(embed1)
                    }
                  
                    if (messageContent === "sword") {
                        _user.life -= damage;
   if(_user.life <= 0) _user.life = 0
                       if(_contricant.life <= 0) _contricant.life = 0
  
                      const espada2 = ["https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(4).gif?v=1600977381693", "https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(2).gif?v=1600977383460", "https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(5).gif?v=1600977475768", "https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(3).gif?v=1600977481815"]
                      let espada = espada2[Math.floor(espada2.length * Math.random())];
                      const embed3 = new Discord.MessageEmbed()
                        .setDescription(`${opponent}, `+MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DAMAGE+ damage +MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DAMAGE_SWORD+ `\n` + opponent.username +MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_LIFE + _contricant.life + "\n " + message.author.username + MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_LIFE + _user.life)
                        .setImage(espada)
                        .setColor("#8B0000")
                      message.channel.send(embed3)
                    }
                    if (messageContent === "dagger") {
_user.life -= damage
 if(_user.life <= 0) _user.life = 0
                       if(_contricant.life <= 0) _contricant.life = 0
  
                      const daga2 = ["https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(4).gif?v=1600977381693", "https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(2).gif?v=1600977383460", "https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(5).gif?v=1600977475768", "https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(3).gif?v=1600977481815"]

                      let daga = daga2[Math.floor(daga2.length * Math.random())];
                      const embed4 = new Discord.MessageEmbed()
                        .setDescription(`${opponent}, `+MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DAMAGE+ damage +MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DAMAGE_DAGGER+ `\n` + opponent.username +MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_LIFE + _contricant.life + "\n " + message.author.username + MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_LIFE + _user.life)
                        .setImage(daga)
                       .setColor("#8B0000")
                      message.channel.send(embed4)
                     }
                      }
                }
                await loopFight(message, opponent, "adversary");
              } catch (e) {
                await loopFight(message, opponent, "adversary");
                
              }
            } else {
              try {
                      let weapon =await weaponModel.findOne({userID: message.author.id})
      if(!weapon) model = await weaponModel.create({
      userID:message.author.id,
      weapons: ["dagger"]
      })

                let messages = await message.channel.awaitMessages((m) => m.author.id === message.author.id && weapon.weapons.includes(m.content.toLowerCase()), { errors: ["time"], max: 1, time: 60000 }).catch(async (err) => {
                  
                  if (fightFinish === false) {
                  await  fightHistory.delete(opponent.id);
                  await  fightHistory.delete(message.author.id);
                   return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_AWAITMESSAGES).setColor("RED"));
                 
                  }
                })
               
                messages = messages.array();
                let msg = messages[0];
                const messageContent = msg.content.toLowerCase()
                if (weapon.weapons.some(item => messageContent.includes(item))) {
                 
                  let damage = Math.floor(Math.random() * 20) + 10
          let equipment = await equipmentModel.findOne({userID: opponent.id})
    if(!equipment) equipment = await equipmentModel.create({
      userID:opponent.id,
    shield: {
      equip: false,
      obtained:false,
 },
  equip: false
    })
    let err2;
     if(equipment.equip === true) {
       err2= Math.floor(Math.random()*100)
     } else {
       err2= 0
     }
     if(err2 >= 70) {
    
       if(LANG === "ES"){
       message.channel.send(new Discord.MessageEmbed().setDescription("¡"+MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_FAIL_1 + +"¡"+message.author.toString()+MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_FAIL_2).setColor("RED"))
       }else if(LANG === "EN"){
message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_FAIL_1 +message.author.toString() + MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_FAIL_2).setColor("RED"))
       }
     }else{
                      if (messageContent === "axe") {
                        
                      _contricant.life -= damage;
                       if(_user.life <= 0) _user.life = 0
                       if(_contricant.life <= 0) _contricant.life = 0

                      const hacha2 = ["https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(7).gif?v=1601317279299"]
                      let hacha = hacha2[Math.floor(hacha2.length * Math.random())];
                      const embed2 = new Discord.MessageEmbed()
                        .setDescription(`${message.author}, `+MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DAMAGE+ damage +MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DAMAGE_AXE+ `\n` + opponent.username +MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_LIFE + _contricant.life + "\n " + message.author.username + MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_LIFE + _user.life)
                        .setImage(hacha)
                        .setColor("#8B0000")
                      message.channel.send(embed2)
                    }
                    if (messageContent === "sword") {
                       _contricant.life -= damage;
                                              if(_user.life <= 0) _user.life = 0
                       if(_contricant.life <= 0) _contricant.life = 0
                      const espada2 = ["https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(4).gif?v=1600977381693", "https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(2).gif?v=1600977383460", "https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(5).gif?v=1600977475768", "https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(3).gif?v=1600977481815"]
                      let espada = espada2[Math.floor(espada2.length * Math.random())];
                      const embed3 = new Discord.MessageEmbed()
                        .setDescription(`${message.author}, `+MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DAMAGE+ damage +MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DAMAGE_SWORD+ `\n` + opponent.username +MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_LIFE + _contricant.life + "\n " + message.author.username + MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_LIFE + _user.life)
                        .setImage(espada)
                        .setColor("#8B0000")
                      message.channel.send(embed3)
                    }
                    if (messageContent === "dagger") {
                       _contricant.life -= damage;
                                              if(_user.life <= 0) _user.life = 0
                       if(_contricant.life <= 0) _contricant.life = 0
  
                      const daga2 = ["https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(4).gif?v=1600977381693", "https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(2).gif?v=1600977383460", "https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(5).gif?v=1600977475768", "https://cdn.glitch.com/7ad7b329-f946-48fb-8117-09d48d1ec894%2Ftenor%20(3).gif?v=1600977481815"]
                      let daga = daga2[Math.floor(daga2.length * Math.random())];
                      const embed5 = new Discord.MessageEmbed()
                        .setDescription(`${message.author}, `+MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DAMAGE+ damage +MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_DAMAGE_DAGGER+ `\n` + opponent.username +MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_LIFE + _contricant.life + "\n " + message.author.username + MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_LIFE + _user.life)
                        .setImage(daga)
                        .setColor("#8B0000")
                       
                      message.channel.send(embed5)
                     }
                  }
                }
                await loopFight(message, opponent, "opponent");
              } catch (e) {
                await loopFight(message, opponent, "opponent");
                
                
              }
            }
          }
        }
        if (reaction.emoji.name === '❎') {
               if (message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) {
          m.edit(new Discord.MessageEmbed().setDescription("Rechazaste el duelo").setColor("RED"))
          m.reactions.removeAll()
            } else {
              m.delete()
              m.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_DUEL_EMBED_DESCRIPTION_REJECTRED).setColor("RED"))
            }
          
          
          
          clearTimeout(time)
        }
      })
    })
  }
}