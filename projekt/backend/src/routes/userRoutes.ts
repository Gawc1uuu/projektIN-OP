import express from "express";
import { loginUser, signupUser } from "../controllers/userControllers";

const router = express.Router();

// login route
router.post("/login", loginUser);

// singup route
router.post("/signup", signupUser);

export default router;
