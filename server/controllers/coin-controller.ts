import { coins_api } from "../config/axios";
import { Request, Response, NextFunction, response } from "express";

/**
* Coin Controller
*/

export class CoinController {
    constructor() { }

    /**
     * Gets top performing coins top 10
     * @param req 
     * @param res 
     * @param next 
     */

    async getTrendingCoins(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await coins_api.get("/coins?limit=10&orderBy=change");

            res.status(200).json(response.data)
        }

        catch (error) {
            console.log(error)
        }
    }

    /**
     * Gets specified coin by uuid
     * @param req 
     * @param res 
     * @param next 
     */
    async getCoinById(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await coins_api.get(`/coins/${req.params.uuid}`);

            res.status(200).json(response.data)
        }

        catch (error) {
            console.log(error)
        }
    }

    /**
     * get 50 coins pe page based on pagination and search
     * @param req 
     * @param res 
     * @param next 
     */

    async searchCoins(req: Request, res: Response, next: NextFunction) {
        try {

            let page = req.body.page, size = req.body.size, search = req.body.search?.trim();
            let offset = (page - 1) * size;
            const response = await coins_api.get(`/coins?search=${search}&limit=${size}&offset=${offset}`);

            res.status(200).json(response.data)
        }

        catch (error) {
            console.log(error)
        }
    }
}