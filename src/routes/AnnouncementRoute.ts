import express from "express";

// Controllers
import AnnouncementController from "src/controllers/AnnouncementController";

// Middlewares
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = AnnouncementController;

router.get("/", authenticateJWT, controller.getAll.bind(controller));
router.get("/:id", authenticateJWT, controller.getById.bind(controller));
router.get("/school/:schoolId", authenticateJWT, controller.getAllBySchoolId.bind(controller));
router.delete("/:id", authenticateJWT, controller.delete.bind(controller));
router.post("/", authenticateJWT, controller.create.bind(controller));
router.patch("/:id", authenticateJWT, controller.update.bind(controller));

export default router;
