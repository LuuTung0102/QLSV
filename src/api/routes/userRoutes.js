import express from "express";
import * as userController from "../controller/userController.js";
import { isAuthenticated , isAuthorization} from "../../middlewares/auth.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", isAuthenticated, userController.logout);
router.delete("/delete/:id", isAuthenticated, isAuthorization(["Admin"]), userController.deleteUser);

export default router;
