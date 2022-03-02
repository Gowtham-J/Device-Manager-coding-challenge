import { body } from "express-validator";

const bodyValidation = [
  body("device").not().isEmpty().withMessage("Device name should be provided"),
  body("os")
    .not()
    .isEmpty()
    .withMessage("Operating system name should be provided"),
  body("manufacturer")
    .not()
    .isEmpty()
    .withMessage("Manufacturer name should be provided"),
];

export { bodyValidation };
