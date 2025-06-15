import express from "express";
import VenueController from "src/controllers/VenueController";
import VenuePictureController from "src/controllers/VenuePictureController";
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controllerVenue = new VenueController();
const controllerVenuePicture = new VenuePictureController();

router.get("/", authenticateJWT, controllerVenue.getAll);
router.get("/:id", authenticateJWT, controllerVenue.getById);
router.post("/", authenticateJWT, controllerVenue.create);
router.delete("/:id", authenticateJWT, controllerVenue.delete);
router.patch("/:id", authenticateJWT, controllerVenue.update);

router.post("/picture", authenticateJWT, controllerVenuePicture.create);
router.delete("/picture/:id", authenticateJWT, controllerVenuePicture.delete);
router.patch("/picture/:id", authenticateJWT, controllerVenuePicture.update);

export default router;