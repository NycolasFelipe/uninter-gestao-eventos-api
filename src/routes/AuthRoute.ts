import express from "express";
import AuthController from "src/controllers/AuthController";
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = new AuthController();

router.post("/login", authenticateJWT, controller.login);

export default router;