import express, { Request, Response } from "express";
import { Device } from "../models/devices";
import { BadRequestError } from "../errors/bad-request-error";
import { requireAuth, currentUser, validateRequest } from "../middlewares";
import { NotFoundError } from "../errors/not-found-error";
import { dateValidation } from "../helpers/daysValidation";

// ===================================================================
const fetchDevice = async (req: Request, res: Response) => {
  // fetching all the device that exists
  await Device.find().then(async (respond) => {
    await dateValidation(respond, Device);
    res.send(respond);
  });
};

// ===================================================================
const checkoutUser = async (req: Request, res: Response) => {
  const device = await Device.findById(req.params.id);

  // to validate the user as already checked in with other device
  const user = await Device.findOne({
    userId: req.currentUser!.id,
    isCheckedOut: false,
  });

  if (!device) {
    throw new NotFoundError();
  }
  // -------------------------

  // to check wether the user is checking-in between 9am-6pm
  const timePeriod = new Date().getHours();
  if (timePeriod >= 9 && timePeriod < 17) {
    if (
      device.isCheckedOut === false &&
      device.userId !== req.currentUser!.id
    ) {
      throw new BadRequestError("This device is checked-in by another user");
    }

    // to validate the user as already checked in with other device
    if (user) {
      if (user?.isCheckedOut === false && device.id !== user.id) {
        throw new BadRequestError(
          "You have already checked-in with another device"
        );
      }
    }
    device.set({
      lastCheckedOutBy: `${req.currentUser!.firstName} ${
        req.currentUser!.lastName
      }`,
      isCheckedOut: !device.isCheckedOut,
      lastCheckedOutDate: new Date(),
      userId: req.currentUser!.id,
    });

    await device.save();
    res.json(device);
  } else {
    throw new BadRequestError(
      "User can only check-in and check-out between 9am to 5pm"
    );
  }
};

// ===================================================================

export { fetchDevice, checkoutUser };
