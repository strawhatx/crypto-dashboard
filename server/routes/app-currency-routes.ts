import { Router } from "express";
//import { CheckAuth } from "../middleware/checkAuth";
import { AppCurrencyController } from "../controllers/app-currency-controller";

const router = Router();
const routes = new AppCurrencyController();

//router.get("/", CheckAuth, routes.getUsers);
router.get("/", routes.getReferenceCurrencies);

export const AppCurrencyRoutes = router;

