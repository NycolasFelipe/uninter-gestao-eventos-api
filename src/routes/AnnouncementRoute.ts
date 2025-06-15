import express from "express";
import AnnouncementController from "src/controllers/AnnouncementController";
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = new AnnouncementController();

router.get("/", authenticateJWT, controller.getAll);
router.get("/:id", authenticateJWT, controller.getById);
router.get("/school/:schoolId", authenticateJWT, controller.getAllBySchoolId);
router.delete("/:id", authenticateJWT, controller.delete);
router.post("/", authenticateJWT, controller.create);
router.patch("/:id", authenticateJWT, controller.update);

export default router;