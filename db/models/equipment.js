const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mngs =mongoose.model("Equipment", 
 new Schema({
 userID: {type: String},
shield: {
 equip: {type: Boolean},
 obtained: {type:Boolean}
 },
  equip: {type: Boolean}
}))
module.exports = mngs