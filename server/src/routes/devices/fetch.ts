import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Device } from "../../models/devices";
import { BadRequestError } from "../../errors/bad-request-error";
import { requireAuth, currentUser, validateRequest } from "../../middlewares";
import { dateValidation } from "../../helpers/daysValidation";

const router = express.Router();

router.get("/devices", async (req, res) => {
  await Device.find().then(async (respond) => {
    await dateValidation(respond, Device);
    res.send(respond);
  });
});

export { router as fetchDeviceRouter };
