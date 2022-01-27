import { Router } from "express";
import { CheckAuth } from "../middleware/checkAuth";
import { UserController } from "../controllers/user-controller";

const router = Router();
const routes = new UserController();

router.get("/", CheckAuth, routes.getUsers);
router.get("/:id", CheckAuth, routes.getUserById);
router.put("/", CheckAuth, routes.updateUser);
router.post("/", CheckAuth, routes.createUser);
router.delete("/:id", CheckAuth, routes.deleteUser);

export const UserRoutes = router;

