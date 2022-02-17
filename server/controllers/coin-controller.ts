import { coins_api } from "../config/axios";
import { Request, Response, NextFunction, response } from "express";
import { GET_ALL_COINS_EXCEPTION_MESSAGE, GET_COINS_HISTORY_EXCEPTION_MESSAGE, GET_COIN_BY_ID_EXCEPTION_MESSAGE, GET_TRENDING_COINS_EXCEPTION_MESSAGE } from "../messages/coin";

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
            const response = await coins_api.get("/coins?limit=10");

            res.status(200).json(response.data)
        }

        catch (error) {
            console.log(error)
            res.status(500).json({ error: GET_TRENDING_COINS_EXCEPTION_MESSAGE })
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
            const id = req.params.id;
            const response = await coins_api.get(`/coin/${id}`);

            res.status(200).json(response.data)
        }

        catch (error) {
            console.log(error);
            res.status(500).json({ error: GET_COIN_BY_ID_EXCEPTION_MESSAGE })
        }
    }

    /**
     * get 30 coins pe page based on pagination and search
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
            console.log(error);
            res.status(500).json({ error: GET_ALL_COINS_EXCEPTION_MESSAGE })
        }
    }

    /**
     * get coin price history
     * @param req 
     * @param res 
     * @param next 
     */

    async getHistoryByCoinId(req: Request, res: Response, next: NextFunction) {
        try {
            let id = req.body.id, period = req.body.period;

            const response = await coins_api.get(`/coin/${id}/history?timePeriod=${period}`);

            res.status(200).json(response.data)
        }

        catch (error) {
            console.log(error)
            res.status(500).json({ error: GET_COINS_HISTORY_EXCEPTION_MESSAGE })
        }
    }
}