import express from "express";
import AuthController from "src/controllers/AuthController";

const router = express.Router();
const controller = new AuthController();

router.post("/login", controller.login);

export default router;