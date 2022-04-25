import { Router } from "express";
//import { CheckAuth } from "../middleware/checkAuth";
import { AccountController } from "../controllers/account-controller";

const router = Router();
const routes = new AccountController();

//router.get("/", CheckAuth, routes.getUsers);
router.get("/", routes.getUsers);
router.get("/:id", routes.getUserById);
router.get("/image/:id", routes.getUsersImageById);
router.put("/", routes.updateUser);
router.post("/", routes.createUser);
router.delete("/:id", routes.deleteUser);

export const AccountRoutes = router;

