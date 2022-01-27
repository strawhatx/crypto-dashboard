import { Router } from "express";
//import { CheckAuth } from "../middleware/checkAuth";
import { UserController } from "../controllers/user-controller";

const router = Router();
const routes = new UserController();

//router.get("/", CheckAuth, routes.getUsers);
router.get("/", routes.getUsers);
router.get("/:id", routes.getUserById);
router.put("/", routes.updateUser);
router.post("/", routes.createUser);
router.delete("/:id", routes.deleteUser);

export const UserRoutes = router;

