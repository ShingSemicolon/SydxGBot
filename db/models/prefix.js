const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mngs =mongoose.model("Prefix", 
 new Schema({
 guildID: {type: String},
prefix: {type: String, default: "&"}

}))
module.exports = mngs
