const { Friends }= require( "../models/friendsModel");

 const getFriensController = async (req, res) => {
    const result = await Friends.find();
    res.status(200).json(result);
 }

module.exports = { getFriensController }