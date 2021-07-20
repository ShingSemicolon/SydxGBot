
/*

.▄▄ ·  ▄· ▄▌·▄▄▄▄  ▐▄• ▄  ▄▄ •  ▄▄▄▄·       ▄▄▄▄▄
▐█ ▀. ▐█▪██▌██▪ ██  █▌█▌▪▐█ ▀ ▪ ▐█ ▀█▪▪     •██  
▄▀▀▀█▄▐█▌▐█▪▐█· ▐█▌ ·██· ▄█ ▀█▄ ▐█▀▀█▄ ▄█▀▄  ▐█.▪
▐█▄▪▐█ ▐█▀·.██. ██ ▪▐█·█▌▐█▄▪▐█ ██▄▪▐█▐█▌.▐▌ ▐█▌·
 ▀▀▀▀   ▀ • ▀▀▀▀▀• •▀▀ ▀▀·▀▀▀▀ · ▀▀▀▀  ▀█▄▀▪ ▀▀▀ 
#4c8d85 #834a52
*/

const express = require('express');
const app = express();

app.listen(3000, () => console.log('El servidor esta listo pro'));

const Discord = require('discord.js')
const client = new Discord.Client({ ws: { properties: { $browser: "Discord Android" }}})

require("discord-buttons")(client)
let fs = require('fs');
let prefix = '&'
client.comandos = new Discord.Collection();
 const cooldowns = new Discord.Collection();
for (const file of fs.readdirSync('./comandos/')) {

   if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);

    let fileContents = require(`./comandos/${file}`);
    client.comandos.set(fileName, fileContents);

  }

}

fs.readdir("./eventos/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./eventos/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

//mas recomendado en el ready
// client.ws.on('INTERACTION_CREATE', async interaction => {
//   // console.log(interaction)//la interaccion
// //  let command = interaction.data.name.toLowerCase()
// //  if(command === "prueba"){//si es ping


// client.api.interactions(interaction.id, interaction.token).callback.post({data: {
//   type: 4,
//   data: {
//     content: 'XD'
//   }
// }})
// })
 const db = require("quick.db")
  
client.ws.on('INTERACTION_CREATE', async interaction => {
  console.log(interaction)
  const lang = new db.table('LANGUAGE');
   if(!lang.has(interaction.member.user.id)){
     await lang.set(interaction.member.user.id, "ES")
   }
   const LANG = await lang.get(interaction.member.user.id)
let MESSAGES_JSON = require("./translate.json")
  const embed = new Discord.MessageEmbed()

.setDescription(MESSAGES_JSON[LANG].MESSAGE_PING_EMBED_DESCRIPTION_1+`${client.ws.ping} ms`)

.setThumbnail(client.user.displayAvatarURL())
.setColor("8B0000")

 let command = interaction.data.name.toLowerCase()
 if(command === "ping") {

   client.api.interactions(interaction.id, interaction.token).callback.post({data: {
    type: 4,
    data: {
      embeds: [embed]}
}})
 }
 
})

 client.on('message', async message => { 
if(!message.guild) return;
let reactModel = require("./db/models/react.js");
let prefixModel = require("./db/models/prefix.js");
  let react = await reactModel.findOne({guildID: message.guild.id})
   if(!react) react = await reactModel.create({
     guildID: message.guild.id,
     reaction: true
   })

  if (message.author.bot) return


 
  if(react.reaction) {
    const xd = ["=D", ":wink:", ":thinking:", ":smile:", ":eyes:"]
  if(message.content.toLowerCase() === "sydxgbot") {
    
    message.channel.send(xd[Math.floor(Math.random()*xd.length)])
  }
  if(message.content === "<@!"+client.user.id+">"){
    message.channel.send(xd[Math.floor(Math.random()*xd.length)])
  }
  let prefi = await prefixModel.findOne({guildID: message.guild.id})
let prefix = prefi ? prefi.prefix : "&"

  let a = ["<@!"+client.user.id+">", "prefix"]
  if(a.every(item => message.content.includes(item))){
    message.channel.send(new Discord.MessageEmbed().setDescription("El prefijo actual es: `"+prefix+"`").setColor("8B0000"))
  }
   if(!message.guild.me.hasPermission("ADD_REACTIONS")) return;
  if(message.content.toLowerCase().startsWith("uwu")){
    message.react("761579348867153936")
  }
  if (message.content.toLowerCase() === 'hola')
    message.react('726440924262957057')
  if (message.content.toLowerCase() === 'hi')
    message.react('726440924262957057')
  if (message.content.toLowerCase() === 'hello')
    message.react('726440924262957057')
  if (message.content.toLowerCase() === 'f')
    message.react('722188645607538749')
  if (message.content.toLowerCase() === 'efe')
    message.react('722188645607538749')
if(message.content.toLowerCase() === 'arriba españa') message.react('726428117094367258')
if(message.content.toLowerCase() === 'arriba argentina') message.react('792129954859057193')
if(message.content.toLowerCase() === 'adios') message.react('726441156400906482')

 const detector_papulince = /^(([<|>]{0,}?[:|;|]['|"]{0,})(v|u|y)|(v|u|y)(['|"]{0,}[:|;][<|>]{0,}))$/ig
 if(message.content.match(detector_papulince))
   message.react("722551085478445128")
  

  }
 })
 client.login(process.env.DISCORD_TOKEN)  