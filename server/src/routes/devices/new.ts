import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Device } from "../../models/devices";
import { BadRequestError } from "../../errors/bad-request-error";
import { requireAuth, currentUser, validateRequest } from "../../middlewares";

const router = express.Router();

router.post(
  "/devices",
  currentUser,
  requireAuth,
  [
    body("device")
      .not()
      .isEmpty()
      .withMessage("Device name should be provided"),
    body("os")
      .not()
      .isEmpty()
      .withMessage("Operating system name should be provided"),
    body("manufacturer")
      .not()
      .isEmpty()
      .withMessage("Manufacturer name should be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { device, os, manufacturer } = req.body;
    const numberOfDevices = await Device.find();
    const existingDevice = await Device.findOne({ device });

    if (numberOfDevices.length >= 10) {
      throw new BadRequestError("The garage already filled with 10 devices");
    }

    if (existingDevice) {
      throw new BadRequestError("Device already exists");
    }

    const lastCheckedOutDate = new Date();
    const newDevice = Device.build({
      device,
      os,
      manufacturer,
      lastCheckedOutDate,
      lastCheckedOutBy: `${req.currentUser!.firstName} ${
        req.currentUser!.lastName
      }`,
      isCheckedOut: true,
      userId: req.currentUser!.id,
      status: "active",
    });

    await newDevice.save();

    res.status(201).json(newDevice);
  }
);

export { router as newDeviceRouter };
