import express from "express";

// Controllers
import PermissionController from "src/controllers/PermissionController";

// Middlewares
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = PermissionController;

router.get("/", authenticateJWT, controller.getAll.bind(controller));
router.get("/:id", authenticateJWT, controller.getById.bind(controller));
router.delete("/:id", authenticateJWT, controller.delete.bind(controller));
router.post("/", authenticateJWT, controller.create.bind(controller));
router.patch("/:id", authenticateJWT, controller.update.bind(controller));

export default router;
