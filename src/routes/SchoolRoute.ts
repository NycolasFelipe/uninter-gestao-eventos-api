import express from "express";

// Controllers
import SchoolController from "src/controllers/SchoolController";

// Middlewares
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = SchoolController;

router.get("/", authenticateJWT, controller.getAll.bind(controller));
router.get("/:id", authenticateJWT, controller.getById.bind(controller));
router.get("/:id/users", authenticateJWT, controller.getAllUsersById.bind(controller));
router.delete("/:id", authenticateJWT, controller.delete.bind(controller));
router.post("/", authenticateJWT, controller.create.bind(controller));
router.patch("/:id", authenticateJWT, controller.update.bind(controller));

export default router;
