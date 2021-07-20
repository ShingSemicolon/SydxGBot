const Discord = require('discord.js')
let economyModel = require("../db/models/economy.js");
let weaponModel = require("../db/models/weapon.js");
let equipmentModel = require("../db/models/equipment.js");
module.exports = {
  cooldown:5,

 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
      let balance = await economyModel.findOne({userID: message.author.id})
      let weapon = await weaponModel.findOne({userID: message.author.id})
      let equipment = await equipmentModel.findOne({userID: message.author.id})
      if(!weapon) weapon = await weaponModel.create({
      userID:message.author.id,
      weapons: ["dagger"]
      })
      if(!balance) balance = await economyModel.create({
      userID:message.author.id,
      money: 0
    })
    if(!equipment) equipment = await equipmentModel.create({
      userID:message.author.id,
    shield: {
      equip: false,
      obtained:false,
 },
  equip: false
    })
    
    

if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_BUY_EMBED_DESCRIPTION_WITHOUT_ARGS).setColor("RED"))
    if (args[0].toLowerCase() == 'axe') {
  if (weapon.weapons.includes("axe")) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_BUY_EMBED_DESCRIPTION_AXE).setColor("RED"))
        if (balance.money < 100) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_BUY_EMBED_DESCRIPTION_WITHOUT_MONEY).setColor("RED"))
       
       balance.money -= 100
       await balance.save()
      weapon.weapons.push("axe");
       await weapon.save()
        message.channel.send(new Discord.MessageEmbed().setDescription("¡"+message.author.username + ' compraste tu hacha!').setColor("8B0000"))
        
    } else if(args[0].toLowerCase() == 'sword') {
      if (weapon.weapons.includes("sword"))  return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_BUY_EMBED_DESCRIPTION_SWORD).setColor("RED"))
        if (balance.money < 200) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_BUY_EMBED_DESCRIPTION_WITHOUT_MONEY).setColor("RED"))
         
        balance.money -= 200
       await balance.save()
      weapon.weapons.push("sword");
       await weapon.save()
        message.channel.send(new Discord.MessageEmbed().setDescription("¡"+message.author.username + ' compraste tu espada!').setColor("8B0000"))
    } else if(args[0].toLowerCase() == 'shield') {
      if (equipment.equip)  return message.channel.send(new Discord.MessageEmbed().setDescription("¡Ya tienes un escudo, no puedes comprar otro!").setColor("RED"))
      // return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_ERROR_NO_AVAILABLE).setColor("RED"))
        if (balance.money < 300) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_BUY_EMBED_DESCRIPTION_WITHOUT_MONEY).setColor("RED"))
         balance.money -= 300
       await balance.save()
       equipment.shield.obtained = true
       equipment.equip = true
       await equipment.save()
        message.channel.send(new Discord.MessageEmbed().setDescription("¡"+message.author.username + ' compraste tu escudo!').setColor("8B0000"))
    }
}
}