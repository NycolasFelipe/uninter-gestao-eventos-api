import express from "express";
import RoleController from "src/controllers/RoleController";
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = new RoleController();

router.get("/", authenticateJWT, controller.getAll);
router.get("/users", authenticateJWT, controller.getAllWithUsers);
router.get("/:id", authenticateJWT, controller.getById);
router.delete("/:id", authenticateJWT, controller.delete);
router.post("/", authenticateJWT, controller.create);
router.post("/:id", authenticateJWT, controller.assignPermissions);
router.patch("/:id", authenticateJWT, controller.update);
router.post("/:id/permissions", authenticateJWT, controller.assignPermissions);
router.patch("/:id", authenticateJWT, controller.update);

export default router;