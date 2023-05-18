const  { News }= require( "../models/newsModel");

 const getNewsController = async (req, res) => {
  const news = await News.find();
  res.status(200).json(news);
};

module.exports = {
  getNewsController
}