import express from "express";
import EventController from "src/controllers/EventController";
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = new EventController();

router.get("/", authenticateJWT, controller.getAll);
router.get("/type", authenticateJWT, controller.getAllByEventTypeId);
router.get("/status", authenticateJWT, controller.getAllByEventStatus);
router.get("/school/:schoolId/", authenticateJWT, controller.getAllBySchoolId);
router.get("/:id", authenticateJWT, controller.getById);
router.delete("/:id", authenticateJWT, controller.delete);
router.post("/", authenticateJWT, controller.create);
router.patch("/:id", authenticateJWT, controller.update);

export default router;