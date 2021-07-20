let economyModel = require("../db/models/economy.js");
let weaponModel = require("../db/models/weapon.js");
let equipmentModel = require("../db/models/equipment.js");
let prefixModel = require("../db/models/prefix.js");
const Discord = require("discord.js");

const cooldowns = new Discord.Collection();

module.exports = async (client, message) => {
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
 
   
let prefi = await prefixModel.findOne({guildID: message.guild.id})
let prefix = prefi ? prefi.prefix : "&"


if(!message.guild) return;
  // let table = new db.table("prefix")
    let langModel = require("../db/models/lang.js");
   
let lan = await langModel.findOne({userID: message.author.id})



  if (message.author.bot) return;
if(!message.content.startsWith(prefix)) return;


const args = message.content.slice(prefix.length).split(/ +/g)
   const MESSAGES_JSON = require("../translate.json")
let LANG = lan ? lan.lang : "ES"

 

   
if (!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.channel.send("Opps...!\n"+MESSAGES_JSON["ES"].MESSAGE_EMBED_PERMISSION)
	const commandName = args.shift().toLowerCase();
console.log(commandName)
	const cmd = client.comandos.get(commandName)
		|| client.comandos.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) 
  
if (!cmd) return
	if (!cooldowns.has(commandName)) {
		cooldowns.set(commandName, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(commandName);
	const cooldownAmount = (cmd.cooldown || 0) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.channel.send(MESSAGES_JSON[LANG].MESSAGE_EMBED_DESCRIPTION_1+ ` ${timeLeft.toFixed(1)} `+MESSAGES_JSON[LANG].MESSAGE_EMBED_DESCRIPTION_2);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


 
 let db = "XD";  
 let economy = "a";
    try{ 
    
  cmd.execute(client, message, args,db, economy ,MESSAGES_JSON, LANG);
  }catch(err){
    console.log(err)
  }

};