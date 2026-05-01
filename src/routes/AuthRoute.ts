import express from "express";

// Controllers
import AuthController from "src/controllers/AuthController";

const router = express.Router();
const controller = AuthController;

router.post("/login", controller.login.bind(controller));

export default router;
