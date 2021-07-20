module.exports = async(client) => {
  try {

  client.user.setPresence({

       activity: {
           name: "&duel",
           type: "COMPETING"
       }
    })
const mongoose = require('mongoose');
await mongoose.connect(process.env.MONGOOSE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(console.log("Conectao"))

  console.log(await client.api.applications(client.user.id)/* .guilds('711943370741776446') */.commands.get())
  //  client.api.applications(client.user.id)/* .guilds('711943370741776446') */.commands('837012343036706857').delete().then(console.log("Awosome!"))
// client.api.applications(client.user.id).commands.post({data: {
//     name: 'ping',
//     description: 'Pong!'
// }})


console.log("\x1b[31m.▄▄ ·  ▄· ▄▌·▄▄▄▄  ▐▄• ▄  ▄▄ •  ▄▄▄▄·       ▄▄▄▄▄\n▐█ ▀. ▐█▪██▌██▪ ██  █▌█▌▪▐█ ▀ ▪ ▐█ ▀█▪▪     •██  \n▄▀▀▀█▄▐█▌▐█▪▐█· ▐█▌ ·██· ▄█ ▀█▄ ▐█▀▀█▄ ▄█▀▄  ▐█.▪\n▐█▄▪▐█ ▐█▀·.██. ██ ▪▐█·█▌▐█▄▪▐█ ██▄▪▐█▐█▌.▐▌ ▐█▌·\n ▀▀▀▀   ▀ • ▀▀▀▀▀• •▀▀ ▀▀·▀▀▀▀ · ▀▀▀▀  ▀█▄▀▪ ▀▀▀ \x1b[0m")
}catch (err) {
  console.log(err)
}

}
