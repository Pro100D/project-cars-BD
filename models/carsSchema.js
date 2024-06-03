import { Schema, model } from "mongoose";
import Joi from "joi";

const carsSchema = new Schema(
  {
    make: {
      type: String,
    },
    model: {
      type: String,
    },
    year: {
      type: Number,
    },
    price: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

export const addSchema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().required(),
  price: Joi.number().required(),
  imageUrl: Joi.string(),
});

const Car = model("car", carsSchema);
export default Car;
