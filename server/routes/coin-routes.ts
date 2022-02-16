import { Router } from "express";
//import { CheckAuth } from "../middleware/checkAuth";
import { CoinController } from "../controllers/coin-controller";

const router = Router();
const routes = new CoinController();

//router.get("/", CheckAuth, routes.getUsers);
router.get("/", routes.getCoins);
router.get("/:id", routes.getCoinById);

export const CoinRoutes = router;

