import { Request, Response, NextFunction } from "express";
import { coins_api } from "../config/axios";
import { GET_WATCHLIST_COINS_EXCEPTION_MESSAGE } from "../messages/watchlist";
import Watchlist from "../models/watchlist";

/**
* Coin Controller
*/

export class WatchlistController {
    constructor() { }

    /**
     * TODO: get watchlist with search and filter
     * @param req 
     * @param res 
     * @param next 
     */
    async searchWatchlist(req: Request, res: Response, next: NextFunction) {
        try {
            let page = req.body.page, size = req.body.size, search = req.body.search?.trim();
            let offset = (page - 1) * size;
            let queryString = "";

            const coins = await Watchlist.find({ userId: req.params.uid, coinName: search }).skip(offset).limit(size);

            if (coins.length > 0) {
                for (let i = 0; i < coins.length; i++) {
                    if (i > 0) queryString += "&";

                    queryString += `uuids[]=${coins[i].coinId}`
                }

                const response = await coins_api.get(`/coins?${queryString}`);

                res.status(200).json(response.data);
            }
            else {
                res.status(200);
            }
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ error: GET_WATCHLIST_COINS_EXCEPTION_MESSAGE })
        }
    }

    /**
     * Public route watchlist single
     * @param req Request
     * @param res Response
     * @param next Next Function
     */
    async addToWatchlist(req: Request, res: Response, next: NextFunction) {
        try {
            let watchlist = {
                _id: "",
                userId: req.body.uid,
                coinId: req.body.coinId,
                coinName: req.body.coinName
            }

            const created = await Watchlist.create(watchlist);

            if (!created) throw new Error("Create failed");

            res.status(201).json({
                message: "Create successful",
            });
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    /**
    * Public route watchlist many
    * @param req Request
    * @param res Response
    * @param next Next Function
    */
    async addManyToWatchlist(req: Request, res: Response, next: NextFunction) {
        try {
            const arr = req.body.watchlists;

            for (let i = 0; i < arr.length; i++) {
                let watchlist = {
                    _id: "",
                    userId: arr[i].uid,
                    coinId: arr[i].cuuid,
                    coinName: arr[i].name
                }

                const created = await Watchlist.create(watchlist);

                if (!created) throw new Error("Create failed");
            }



            res.status(201).json({
                message: "Create successful",
            });
        }
        catch (error: any) {
            throw new Error(error);
        }
    }
}