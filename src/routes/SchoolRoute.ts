import express from "express";
import SchoolController from "src/controllers/SchoolController";
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = new SchoolController();

router.get("/", authenticateJWT, controller.getAll);
router.get("/:id", authenticateJWT, controller.getById);
router.get("/:id/users", authenticateJWT, controller.getAllUsersById);
router.delete("/:id", authenticateJWT, controller.delete);
router.post("/", authenticateJWT, controller.create);
router.patch("/:id", authenticateJWT, controller.update);

export default router;