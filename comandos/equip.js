let equipmentModel = require("../db/models/equipment.js");
let Discord = require("discord.js")
module.exports = {
  cooldown:5,
  async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
    // return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON["ES"].MESSAGE_ERROR_NO_AVAILABLE).setColor("RED"))
    let equipment = await equipmentModel.findOne({userID: message.author.id})
    if(!equipment) equipment = await equipmentModel.create({
      userID:message.author.id,
         shield: {
      equip: false,
      obtained:false,
 },
  equip: false,
    })
    
     let items = ["shield"]
    // return message.channel.send(new Discord.MessageEmbed().setDescription("¡No está disponible!").setColor("RED"))
   if(!equipment.equip) return message.channel.send("No tienes ningun item protector") 
    if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_EQUIP_EMBED_DESCRIPTION_COMMANDUSE).setColor("RED"))
   
     if (items.some(item => args[0].includes(item))) {
 if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_EQUIP_EMBED_DESCRIPTION_COMMANDUSE).setColor("RED"))
      if(args[0].toLowerCase() === "shield"){
        if(!equipment.shield.obtained) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_EQUIP_EMBED_DESCRIPTION_DONTHAVE).setColor("RED"))
        if(args[1].toLowerCase() === "on"){
        
        if(equipment.shield.equip) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_EQUIP_EMBED_DESCRIPTION_EQUIPPED_SHIELD).setColor("8B0000"))
        equipment.shield.equip = true
        equipment.save()
     
      
      message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_EQUIP_EMBED_DESCRIPTION_EQUIPP_SHIELD).setColor("8B0000"))
        } else
    if(args[1].toLowerCase() === "off"){
      // if(!equipment.shield.obtained) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_EQUIP_EMBED_DESCRIPTION_EQUIPPED_SHIELD).setColor("RED"))
    if(!equipment.shield.equip) return message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_EQUIP_EMBED_DESCRIPTION_REMOVED_SHIELD).setColor("RED"))
  
            equipment.shield.equip = false
        equipment.save()
    message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_EQUIP_EMBED_DESCRIPTION_REMOVE_SHIELD).setColor("8B0000"))
    } else{
      message.channel.send(MESSAGES_JSON[LANG].MESSAGE_EQUIP_EMBED_DESCRIPTION_COMMANDUSE)
    }
      }
   
        
        } else {
          message.channel.send(new Discord.MessageEmbed().setDescription(MESSAGES_JSON[LANG].MESSAGE_EQUIP_EMBED_DESCRIPTION_COMMANDUSE).setColor("RED"))
        }
    }
    
  }
