import { Friends } from "../models/friendsModel";

export const getFriensController = async (req, res) => {
    const result = await Friends.find();
    res.json(200, result);
}