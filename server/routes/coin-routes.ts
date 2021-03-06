import { Router } from "express";
//import { CheckAuth } from "../middleware/checkAuth";
import { CoinController } from "../controllers/coin-controller";

const router = Router();
const routes = new CoinController();

//router.get("/", CheckAuth, routes.getUsers);
router.get("/trending", routes.getTrendingCoins);
router.get("/popular", routes.getPopularCoins);
router.get("/:id", routes.getCoinById);
router.post("/history", routes.getHistoryByCoinId);
router.post("/search", routes.searchCoins);

export const CoinRoutes = router;

