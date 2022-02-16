import { coins_api } from "../config/axios"

/**
* Coin Controller
*/

export class CoinController {
    constructor() { }

    /**
     * Gets coins
     * @returns  an array of coins
     */

    async getCoins() {
        try {
            return await coins_api.get("/coins");
        }

        catch (error) {
            console.log(error)
        }
    }



    /**
     * Gets specified coin by uuid
     * @param id 
     * @returns  User object
     */
    async getCoinById(uuid: string) {
        try {
            return await coins_api.get(`/coins/${uuid}`);
        }

        catch (error) {
            console.log(error)
        }
    }
}