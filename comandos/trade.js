let tradePending = []
module.exports = {
  cooldown:5,
 async execute(client, message, args, db, economy, MESSAGES_JSON, LANG) {

  
    if(!tradePending[0]){
      console.log(tradePending[0])
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
 tradePending.push({mention:{user: user.id}})
 } 
 if(reaction.emoji.name === "❎"){
return message.channel.send("Ah rechazaste? :(")
 }
  })
})

    }else{
       if(!args[0]) return message.channel.send("Introduce un argumento (money)")
if(args[0].toLowerCase() === "money"){

let number = parseInt(args[2])
if(isNaN(number)) return message.channel.send("Uso: trade money add o remove")
if(!args[2]) return message.channel.send("Agrega una cantidad de dinero")
let money = tradePending.push(`author_${message.author.id}`) || 0
if(args[1].toLowerCase() === "add"){
  money += number
if(tradePending.get(`author_${message.author.id}`) === message.author.id) tradePending.set(`author_${message.author.id}`,{money: money})
if(tradePending.get(`user_${message.author.id}`) === message.author.id) tradePending.set(`author_${message.author.id}`,{money: money})

message.channel.send("Se agregó "+number+" de dinero")
}
if(args[1].toLowerCase() === "remove"){
  money - number
if(tradePending.get(`author_${message.author.id}`) === message.author.id) tradePending.set(`author_${message.author.id}`,{money: money})
if(tradePending.get(`user_${message.author.id}`) === message.author.id) tradePending.set(`author_${message.author.id}`,{money: money})

message.channel.send("Se removió "+number+" de dinero")
  }
}

  
if(!tradePending.get(`author_${message.author.id}`) || tradePending.get(`user_${tradePending.get(`author_${message.author.id}`).trade}`)) return message.channel.send("No estas en el tradeo!")
if(args[0].toLowerCase() === "confirm"){
message.channel.send("Confirmaste el intercambio")
tradePending.delete(`author_${message.author.id}`)
tradePending.delete(`user_${tradePending.get(`author_${message.author.id}`).trade}`)
}
if(args[0].toLowerCase() === "deny"){
message.channel.send("Rechazo el tradeo :(")
tradePending.delete(`author_${message.author.id}`)
tradePending.delete(`user_${tradePending.get(`author_${message.author.id}`).trade}`)
}
   
  
  }}
}