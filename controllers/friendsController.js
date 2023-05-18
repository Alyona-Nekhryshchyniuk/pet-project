import { Friends } from "../models/friendsModel";

export const getFriensController = async (req, res) => {
    const result = await Friends.find();
    res.status(200).json(result);
}