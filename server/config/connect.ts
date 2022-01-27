import mongoose, { connect } from "mongoose";
import { CONNECTION_STRING as MONGO_URI } from ".";

export class Connection {
    constructor() {
        this.start();
    }

    public start(): void {
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Mongo Connection Established");
        });

        connection.on("reconnected", () => {
            console.log("Mongo Connection Reestablished")
        });

        connection.on("disconnected", () => {
            console.log("Mongo Connection Disconnected");
            console.log("Trying to reconnect to MongoDB");

            setTimeout(() => {
                mongoose.connect(MONGO_URI, {
                    keepAlive: true,
                    socketTimeoutMS: 3000,
                    connectTimeoutMS: 3000
                })
            }, 3000);
        });

        connection.on("close", () => {
            console.log("Mongo Connection Colsed");
        });

        connection.on("error", (error: Error) => {
            console.log(`Mong Connection ERROR: ${error}`);
        });

        const run = async () => {
            await mongoose.connect(MONGO_URI, { keepAlive: true });
        };

        run().catch(error => console.error(error));
    }
}