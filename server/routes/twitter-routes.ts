import { Router } from "express";
//import { CheckAuth } from "../middleware/checkAuth";
import { TwitterController } from "../controllers/twitter-controller";

const router = Router();
const routes = new TwitterController();

//router.get("/", CheckAuth, routes.getUsers);
router.get("/:query", routes.getTweets);

export const TwitterRoutes = router;

