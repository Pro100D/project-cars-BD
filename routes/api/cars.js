import ctrl from "../../controllers/cars.js";
import express from "express";
import upload from "../../middlevares/upload.js";

const router = express.Router();

router.get("/", ctrl.getAllCars);

router.post("/", upload.single("imageUrl"), ctrl.addCar);

router.delete("/:carId", ctrl.deleteCar);

router.patch("/:carId", upload.single("imageUrl"), ctrl.updateCar);

export default router;
