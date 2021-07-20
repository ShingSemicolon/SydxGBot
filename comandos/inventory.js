const Discord = require("discord.js")
let economyModel = require("../db/models/economy.js");
let weaponModel = require("../db/models/weapon.js");
let equipmentModel = require("../db/models/equipment.js");

module.exports = {
  cooldown:5,
  aliases: ["i"],
 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
   let user = message.mentions.users.first() || message.author
         let balance = await economyModel.findOne({userID: user.id})
      let weapon = await weaponModel.findOne({userID: user.id})
      let equipment = await equipmentModel.findOne({userID: user.id})
      if(!weapon) weapon = await weaponModel.create({
      userID:user.id,
      weapons: ["dagger"]
      })
      if(!balance) balance = await economyModel.create({
      userID:user.id,
      money: 0
    })
    if(!equipment) equipment = await equipmentModel.create({
      userID:user.id,
    shield: {
      equip: false,
      obtained:false,
 },
  equip: false
    })
   const arms = new db.table("arms")
const equi = new db.table("equip")
let equip1;

 if(equipment.shield.obtained) {
 if(equipment.shield.equip){
equip1="Escudo equipado"
 } else {
equip1="Escudo guardado"
 }
} else {
  equip1="No tiene escudo"
}
         if (!arms.has(`${user.id}`)) {
  await arms.push(`${message.author.id}`, "dagger")
  }
 let ejemplo = await arms.get(`${message.author.id}`)
 message.channel.send(new Discord.MessageEmbed().setTitle(MESSAGES_JSON[LANG].MESSAGE_INVENTORY_EMBED_TITLE).setDescription("Armas: `"+weapon.weapons.join(", ")+"`\n Protección: `" + equip1+"`").setColor("8B0000"))
}
}