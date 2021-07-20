 const Discord = require("discord.js");
let fs = require("fs")
module.exports = {
cooldown:0,
aliases: ["e"],
 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
if (!["525315362779299851"].includes(message.author.id))  return
function ms(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  s = (s - mins) / 60;
  var hrs = s % 24
return hrs + ':' + mins + ':' + secs + '.' + ms;

}

  if(args.join(' ').toLowerCase().includes("token")){
  return message.channel.send('Hacker >:(');
}

let limit = 1950;
    try  {
      let code = args.join(' ');
      let evalued = eval(code);
      if (typeof evalued !== "string")
        evalued = require("util").inspect(evalued);
      let txt = "" + evalued;
      if (txt.length > limit) {
        message.channel.send( `\`\`\`js\n ${txt.slice(0, limit)}\n\`\`\``);
      } else
        message.channel.send(`\`\`\`js\n ${txt}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
    }
  
}
}