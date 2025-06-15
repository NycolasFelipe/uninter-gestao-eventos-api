import express from "express";
import PermissionController from "src/controllers/PermissionController";
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = new PermissionController();

router.get("/", authenticateJWT, controller.getAll);
router.get("/:id", authenticateJWT, controller.getById);
router.delete("/:id", authenticateJWT, controller.delete);
router.post("/", authenticateJWT, controller.create);
router.patch("/:id", authenticateJWT, controller.update);

export default router;