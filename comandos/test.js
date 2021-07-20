const Discord = require('discord.js'); //Define the discord.js module

module.exports = {
  cooldown:5,
 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
    const { MessageButton } = require("discord-buttons")

    let btn = new MessageButton()
       //default: blurple
      .setLabel("Invita al bot!") 
      //default: NO_LABEL_PROVIDED
      .setStyle('url')
      .setURL("https://top.gg/bot/641301315728965632/invite") //note: if you use the style "url" you must provide url using .setURL('https://example.com')
      
      // .setID(false)
      // .setID('my_custom_id');
  
message.channel.send("Hola", btn)

   

}
}