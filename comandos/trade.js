let tradePending = []
module.exports = {
  cooldown:5,
 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {
    if(!tradePending[0]){
let user = message.mentions.users.first()
 if(!user) return message.channel.send("!user")
 message.channel.send("Acepta=D").then(msg => {
msg.react("✅")
 msg.react("❎")
  msg.awaitReactions((reaction, user1) => {
      if (user.id !== user1.id) return;
    if(message.member.guild.me.hasPermission("MANAGE_MESSAGES")){
        reaction.users.remove(user1.id);

      }
 if(reaction.emoji.name === "✅"){
message.channel.send("Aceptaste :wink: =D")
console.log(tradePending)

tradePending.push({author:{user: message.author.id}})
 tradePending.push({author:{user: user.id}})
 } 
 if(reaction.emoji.name === "❎"){
return message.channel.send("Ah rechazaste? :(")
 }
  })
})

    }else{
      
if(args[0].toLowerCase() === "money"){

let number = parseInt(args[2])
if(isNaN(number)) return message.channel.send("Uso: trade money add o remove")
if(!args[2]) return message.channel.send("Agrega una cantidad de dinero")
let totalMoney;
if(!tradePending[0].author.money){
  tradePending[0].author.money = 0
} else if(!tradePending[1].author.money){
  tradePending[1].author.money = 0
}

if(args[1].toLowerCase() === "add"){
 
if(tradePending[0].author.user === message.author.id) {
  totalMoney = tradePending[0].author.money + number
tradePending[0].author.money = totalMoney
}
if(tradePending[1].author.user === message.author.id) {
 totalMoney = tradePending[1].author.money + number
tradePending[1].author.money = totalMoney
}
message.channel.send("Se agregó "+totalMoney+" de dinero")
}
if(args[1].toLowerCase() === "remove"){
if(tradePending[0].author.user === message.author.id) {
  totalMoney = tradePending[0].author.money - number
tradePending[0].author.money = totalMoney
}
if(tradePending[1].author.user === message.author.id) {
 totalMoney = tradePending[1].author.money - number
tradePending[1].author.money = totalMoney
}message.channel.send("Se removió "+number+" de dinero")
  }
} else if(args[0].toLowerCase() === "confirm"){
message.channel.send("Confirmaste el intercambio")
tradePending = []
}
if(args[0].toLowerCase() === "deny"){
message.channel.send("Rechazo el tradeo :(")
tradePending = []
} else {
  if(tradePending[0].author.user !== message.author.id || tradePending[1].author.user !== message.author.id) return message.channel.send("No estas en el tradeo!")
}
   
  
  }}
}