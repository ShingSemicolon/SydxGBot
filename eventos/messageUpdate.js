module.exports = async (client, oldMessage, newMessage) => {
    try {

    if((oldMessage.content !== newMessage.content) &&  
        !oldMessage.ejecutoComando 
    ){
        client.emit("message", newMessage) 
    }

}catch (err) {
  console.log(err)
}
}