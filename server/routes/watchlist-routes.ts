import { Router } from "express";
//import { CheckAuth } from "../middleware/checkAuth";
import { WatchlistController } from "../controllers/watchlist-controller";

const router = Router();
const routes = new WatchlistController();

//router.get("/", CheckAuth, routes.getUsers);
router.post("/add", routes.addToWatchlist);
router.post("/search", routes.searchWatchlist);

export const WatchlistRoutes = router;

