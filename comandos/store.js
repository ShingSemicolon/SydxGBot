 const Discord = require('discord.js')
let weaponModel = require("../db/models/weapon.js")
let equipmentModel = require("../db/models/equipment.js");

module.exports = {
  cooldown:5,
aliases: ["shop"],
 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {

  let weapon =await weaponModel.findOne({userID: message.author.id})
  let equipment = await equipmentModel.findOne({userID: message.author.id})
  


     
    let embed = new Discord.MessageEmbed()
    .setTitle(MESSAGES_JSON[LANG].MESSAGE_STORE_EMBED_TITLE)
    .setDescription(MESSAGES_JSON[LANG].MESSAGE_STORE_EMBED_DESCRIPTION)
    .addField("Axe `100€`", weapon.weapons.includes("axe") ? MESSAGES_JSON[LANG].MESSAGE_STORE_EMBED_FIELD_VALUE_1+MESSAGES_JSON[LANG].MESSAGE_STORE_EMBED_FIELD_VALUE_HAVE : MESSAGES_JSON[LANG].MESSAGE_STORE_EMBED_FIELD_VALUE_1 )
    .addField("Sword `200€`",  weapon.weapons.includes("sword") ? MESSAGES_JSON[LANG].MESSAGE_STORE_EMBED_FIELD_VALUE_2+MESSAGES_JSON[LANG].MESSAGE_STORE_EMBED_FIELD_VALUE_HAVE : MESSAGES_JSON[LANG].MESSAGE_STORE_EMBED_FIELD_VALUE_2) 
    .addField("Shield `300€`", equipment.shield.obtained ? MESSAGES_JSON[LANG].MESSAGE_STORE_EMBED_FIELD_VALUE_3+MESSAGES_JSON[LANG].MESSAGE_STORE_EMBED_FIELD_VALUE_HAVE : MESSAGES_JSON[LANG].MESSAGE_STORE_EMBED_FIELD_VALUE_3)
    .setColor("RANDOM") 

    message.channel.send(embed)


 }
}