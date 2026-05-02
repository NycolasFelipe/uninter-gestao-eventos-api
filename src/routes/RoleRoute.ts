import express from "express";

// Controllers
import RoleController from "src/controllers/RoleController";

// Middlewares
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = RoleController;

router.get("/", authenticateJWT, controller.getAll.bind(controller));
router.get("/users", authenticateJWT, controller.getAllWithUsers.bind(controller));
router.get("/:id", authenticateJWT, controller.getById.bind(controller));
router.delete("/:id", authenticateJWT, controller.delete.bind(controller));
router.post("/", authenticateJWT, controller.create.bind(controller));
router.post("/:id", authenticateJWT, controller.assignPermissions.bind(controller));
router.patch("/:id", authenticateJWT, controller.update.bind(controller));
router.post("/:id/permissions", authenticateJWT, controller.assignPermissions.bind(controller));
router.patch("/:id", authenticateJWT, controller.update.bind(controller));

export default router;
