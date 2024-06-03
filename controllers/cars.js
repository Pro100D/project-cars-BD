import { ctrlWrapper } from "../decorators/ctrlWrapper.js";
import Car, { addSchema } from "../models/carsSchema.js";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import HttpError from "../helpers/httpError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.join(__dirname, "../public", "images");

const getAllCars = async (req, res) => {
  const allCars = await Car.find();

  res.json(allCars);
};

const addCar = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  try {
    const { path: tempUpload, originalname } = req.file;

    const resultUpload = path.join(imagesDir, originalname);
    await fs.rename(tempUpload, resultUpload);

    const imageUrl = path.join("images", originalname);

    const newCar = {
      ...req.body,
      imageUrl,
    };

    const carAdd = await Car.create(newCar);
    res.status(201).json(carAdd);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteCar = async (req, res) => {
  const { carId } = req.params;
  if (!carId) {
    throw HttpError(404, "Not Faund");
  }

  await Car.findOneAndRemove({ _id: carId });

  res.json("contact deleted");
};

const updateCar = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, `missing fields ${error.message}`);
  }
  try {
    const { carId } = req.params;

    const { path: tempUpload, originalname } = req.file;

    const resultUpload = path.join(imagesDir, originalname);
    await fs.rename(tempUpload, resultUpload);

    const imageUrl = path.join("images", originalname);

    const editedCar = {
      ...req.body,
      imageUrl,
    };

    const updateStatusCar = await Car.findOneAndUpdate(
      { _id: carId },
      editedCar,
      {
        new: true,
      }
    );
    if (!updateStatusCar) {
      throw HttpError(404, "Not Faund");
    }
    res.json(updateStatusCar);
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAllCars: ctrlWrapper(getAllCars),
  addCar: ctrlWrapper(addCar),
  deleteCar: ctrlWrapper(deleteCar),
  updateCar: ctrlWrapper(updateCar),
};
