import express from "express";

// Controllers
import SubscriptionController from "src/controllers/SubscriptionController";

// Middlewares
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = SubscriptionController;

router.get("/", authenticateJWT, controller.getAll.bind(controller));
router.get("/my-subscriptions", authenticateJWT, controller.getAllByUserId.bind(controller));
router.get("/cancel/:id", authenticateJWT, controller.cancel.bind(controller));
router.post("/", authenticateJWT, controller.create.bind(controller));


export default router;
