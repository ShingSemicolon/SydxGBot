const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mngs =mongoose.model("Trade", 
 new Schema({
 author: {
   user: {type: String},
   money: {type: Number},
   inTrade: {type: Boolean}
 },
mention: {
  user: {type: String},
  money: {type: Number},
  inTrade: {type: Boolean}
}

}))
module.exports = mngs