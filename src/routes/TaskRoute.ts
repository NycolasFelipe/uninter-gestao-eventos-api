import express from "express";
import TaskController from "src/controllers/TaskController";
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = new TaskController();

router.get("/", authenticateJWT, controller.getAll);
router.get("/:id", authenticateJWT, controller.getById);
router.get("/event/:eventId", authenticateJWT, controller.getAllByEventId);
router.delete("/:id", authenticateJWT, controller.delete);
router.post("/", authenticateJWT, controller.create);
router.patch("/:id", authenticateJWT, controller.update);

export default router;