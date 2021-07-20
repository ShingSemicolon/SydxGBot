const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mngs =mongoose.model("React", 
 new Schema({
 guildID: {type: String},
reaction: {type: Boolean}

}))
module.exports = mngs