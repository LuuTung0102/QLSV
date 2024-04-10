import express from "express";
import {login, register, logout, getUser, deleteUser } from "../controller/userController.js"
import { isAuthenticated } from "../../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.delete("/delete/:id", isAuthenticated, deleteUser);

export default router;