import { model, Schema } from "mongoose"

/**
 * Iwatchlist interface
 */
export interface IWatchlist {
    _id: string,
    userId: string,
    coinId: string,
    coinName: string
}

/**
 * Watchlist schema
 */
class WatchlistSchema {
    /**
     * Gets schema
     */
    static get schema() {
        var schema: Schema<IWatchlist> = new Schema(
            {
                _id: { type: String, trim: true, required: [true, "id is required"], unique: true, },
                userId: { type: String, trim: true, required: [true, "users id is required"] },
                coinId: { type: String, trim: true, required: [true, "coins id is required"] },
                coinName: {
                    type: String,
                    required: [true, "coin name is required"],
                },
            },
        );

        return schema
    }
}

const Watchlist = model<IWatchlist>("watchlists", WatchlistSchema.schema);


// Export Mongoose model
export default Watchlist;