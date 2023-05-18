import { News } from "../models/newsModel";

export const getNewsController = async (req, res) => {
  const news = await News.find();
  res.json(200, news);
};