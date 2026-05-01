import express from "express";

// Controllers
import UserController from "src/controllers/UserController";

// Middlewares
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = UserController;

router.get("/", authenticateJWT, controller.getAll.bind(controller));
router.get("/my-details", authenticateJWT, controller.getDetailById.bind(controller));
router.get("/:id/detail", authenticateJWT, controller.getDetailById.bind(controller));
router.get("/:id", authenticateJWT, controller.getById.bind(controller));
router.delete("/:id", authenticateJWT, controller.delete.bind(controller));
router.post("/", authenticateJWT, controller.create.bind(controller));
router.patch("/:id", authenticateJWT, controller.update.bind(controller));

export default router;
