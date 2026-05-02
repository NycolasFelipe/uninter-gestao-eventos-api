import express from "express";

// Controllers
import EventController from "src/controllers/EventController";

const router = express.Router();
const controller = EventController;

router.get("/", controller.getAll.bind(controller));
router.get("/detailed", controller.getAllDetailed.bind(controller));
router.get("/type", controller.getAllByEventTypeId.bind(controller));
router.get("/status", controller.getAllByEventStatus.bind(controller));
router.get("/school/:schoolId/", controller.getAllBySchoolId.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.delete("/:id", controller.delete.bind(controller));
router.post("/", controller.create.bind(controller));
router.patch("/:id", controller.update.bind(controller));

export default router;
