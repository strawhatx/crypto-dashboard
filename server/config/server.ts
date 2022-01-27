import "express";
import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors"
import { PORT } from "./"
import { Connection } from "./connect"
import { UserRoutes } from "../routes/user-routes";
export class Server {
    public app: express.Application;
    public connect: Connection;

    /** 
   * Constructor 
   */
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.connect = new Connection();
    }

    /** 
    * Controller routes
    */
    public routes(): void {
        this.app.use("api/users", UserRoutes);

    }

    /** 
    * App Configuration
    */
    public config(): void {
        const corsOptions = {
            origin: "http://localhost:3000",
            credentials: true,
        }

        this.app.use(morgan("dev"));
        this.app.set("port", PORT);
        this.app.use(express.json({ type: "application/json" }));
        this.app.use(express.urlencoded({ extended: true }))

        /** API */
        this.app.use(cors(corsOptions));

        this.app.use((req: any, res: any, next: any) => {
            /** Sites we will allow to connect */
            res.setHeader("Access-Control-Allow-Origin", "*")

            /** Methods we will allow */
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")

            /** Request Headers we will allow */
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")

            /** Set to true if you need the website to include cookies in the requests sent
                to the API (e.g. in case you use sessions) */
            res.setHeader("Access-Control-Allow-Credentials", "true")

            /** Go to next process */
            next();
        })
    }

    /** 
    * Start server
    */
    public start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("ApI is running @ http://localhost:%d", this.app.get("port"));
        });
    }
}