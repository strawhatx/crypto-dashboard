import { coins_api } from "../config/axios";
import { Request, Response, NextFunction } from "express"
import { GET_APP_CURRENCIES_EXCEPTION_MESSAGE } from "../messages/app-currency";

export class AppCurrencyController {
    constructor() { }

    /**
     * get the app currencies to be set as app default
     * @param req 
     * @param res 
     * @param next 
     */
    async getReferenceCurrencies(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await coins_api.get("/reference-currencies?limit=30&types[]=fiat");

            res.status(200).json(response.data);

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: GET_APP_CURRENCIES_EXCEPTION_MESSAGE })
        }
    }
}