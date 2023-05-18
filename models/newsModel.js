const mongoose= require( "mongoose");
const Schema = mongoose.Schema;

const newsModel = new Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
});

const News = mongoose.model("News", newsModel);
 
module.exports ={News}