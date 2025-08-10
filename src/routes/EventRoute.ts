import express from "express";
import EventController from "src/controllers/EventController";

const router = express.Router();
const controller = new EventController();

router.get("/", controller.getAll);
router.get("/detailed", controller.getAllDetailed);
router.get("/type", controller.getAllByEventTypeId);
router.get("/status", controller.getAllByEventStatus);
router.get("/school/:schoolId/", controller.getAllBySchoolId);
router.get("/:id", controller.getById);
router.delete("/:id", controller.delete);
router.post("/", controller.create);
router.patch("/:id", controller.update);

export default router;