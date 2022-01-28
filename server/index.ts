import 'dotenv/config'

import { Server } from "./config/server";

const server = new Server();

server.start();

export default new Server().app;