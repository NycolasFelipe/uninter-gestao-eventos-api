import express from "express";

// Controllers
import VenueController from "src/controllers/VenueController";
import VenuePictureController from "src/controllers/VenuePictureController";

// Middlewares
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controllerVenue = VenueController;
const controllerVenuePicture = VenuePictureController;

router.get("/picture", authenticateJWT, controllerVenuePicture.getAll.bind(controllerVenuePicture));
router.post("/picture", authenticateJWT, controllerVenuePicture.create.bind(controllerVenuePicture));
router.delete("/picture/:id", authenticateJWT, controllerVenuePicture.delete.bind(controllerVenuePicture));
router.patch("/picture/:id", authenticateJWT, controllerVenuePicture.update.bind(controllerVenuePicture));

router.get("/", authenticateJWT, controllerVenue.getAll.bind(controllerVenue));
router.get("/:id", authenticateJWT, controllerVenue.getById.bind(controllerVenue));
router.get("/school/:id", authenticateJWT, controllerVenue.getAllBySchoolId.bind(controllerVenue));
router.post("/", authenticateJWT, controllerVenue.create.bind(controllerVenue));
router.delete("/:id", authenticateJWT, controllerVenue.delete.bind(controllerVenue));
router.patch("/:id", authenticateJWT, controllerVenue.update.bind(controllerVenue));


export default router;
