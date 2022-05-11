import { Router } from "express";
//import { CheckAuth } from "../middleware/checkAuth";
import { WatchlistController } from "../controllers/watchlist-controller";

const router = Router();
const routes = new WatchlistController();

//router.get("/", CheckAuth, routes.getUsers);
router.get("/:id", routes.getWatchlistItemById);
router.post("/add", routes.addToWatchlist);
router.post("/addmany", routes.addManyToWatchlist);
router.post("/search", routes.searchWatchlist);

export const WatchlistRoutes = router;

