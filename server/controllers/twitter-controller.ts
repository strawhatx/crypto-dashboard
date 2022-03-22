import { twitter_api } from "../config/axios";
import { Request, Response, NextFunction } from "express"
import { GET_TWEETS_EXCEPTION_MESSAGE } from "../messages/twitter";

export class TwitterController {

    constructor() { }

    /**
     * get the app currencies to be set as app default
     * @param req 
     * @param res 
     * @param next 
     */
    async getTweets(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.params.query;

            const response = await twitter_api.get(`/search/tweets.json?q=${query}&result_type=popular`);

            res.status(200).json(response.data);

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: GET_TWEETS_EXCEPTION_MESSAGE })
        }
    }


}