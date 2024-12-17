import { getTravelsData } from "../services/travelsServices.js";

export const getTravels = (req, res) => {
    try{
        const countries = getTravelsData();
        res.status(200).json({ countries });
    } 
    catch (err) {
        res.status(500).json({ error: err.message});
    }
};