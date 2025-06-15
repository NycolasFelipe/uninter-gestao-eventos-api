import express from "express";
import UserController from "src/controllers/UserController";
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = new UserController();

router.get("/", authenticateJWT, controller.getAll);
router.get("/:id", authenticateJWT, controller.getById);
router.get("/:id/detail", authenticateJWT, controller.getDetailById);
router.delete("/:id", authenticateJWT, controller.delete);
router.post("/", authenticateJWT, controller.create);
router.patch("/:id", authenticateJWT, controller.update);

export default router;