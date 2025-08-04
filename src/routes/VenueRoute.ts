import express from "express";
import VenueController from "src/controllers/VenueController";
import VenuePictureController from "src/controllers/VenuePictureController";
import authenticateJWT from "src/middlewares/authenticateJWT";

const router = express.Router();
const controllerVenue = new VenueController();
const controllerVenuePicture = new VenuePictureController();

router.get("/picture", authenticateJWT, controllerVenuePicture.getAll);
router.post("/picture", authenticateJWT, controllerVenuePicture.create);
router.delete("/picture/:id", authenticateJWT, controllerVenuePicture.delete);
router.patch("/picture/:id", authenticateJWT, controllerVenuePicture.update);

router.get("/", authenticateJWT, controllerVenue.getAll);
router.get("/:id", authenticateJWT, controllerVenue.getById);
router.get("/school/:id", authenticateJWT, controllerVenue.getAllBySchoolId);
router.post("/", authenticateJWT, controllerVenue.create);
router.delete("/:id", authenticateJWT, controllerVenue.delete);
router.patch("/:id", authenticateJWT, controllerVenue.update);


export default router;