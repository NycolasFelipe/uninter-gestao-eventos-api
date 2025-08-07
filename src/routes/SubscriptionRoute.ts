import express from "express";
import SubscriptionController from "src/controllers/SubscriptionController";
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controller = new SubscriptionController();

router.get("/", authenticateJWT, controller.getAll);
router.get("/my-subscriptions", authenticateJWT, controller.getAllByUserId);
router.get("/cancel/:id", authenticateJWT, controller.cancel);
router.post("/", authenticateJWT, controller.create);


export default router;