import express from "express";
import { signupuser } from "../controlers/auth-controler.js";
import { loginuser } from "../controlers/auth-controler.js";
import { logout } from "../controlers/auth-controler.js";
const router = express.Router();

router.post("/signup", signupuser);

router.post("/login", loginuser);

router.post("/logout", logout);

export default router;
