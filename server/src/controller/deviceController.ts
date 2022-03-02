import express, { Request, Response } from "express";
import { Device } from "../models/devices";
import { BadRequestError } from "../errors/bad-request-error";
import { requireAuth, currentUser, validateRequest } from "../middlewares";
import { NotFoundError } from "../errors/not-found-error";
import { dateValidation } from "../helpers/dateValidation";

// ===================================================================
const fetchDevice = async (req: Request, res: Response) => {
  // fetching all the device that exists
  try {
    const response = await Device.find();
    await dateValidation(response, Device);
    res.status(200).json(response);
    // await Device.find().then(async (respond) => {
    //   await dateValidation(respond, Device);
    //   res.status(200).json(respond);
    // });
  } catch (error) {
    res.send(error);
  }
};

// ===================================================================
const fetchDeviceById = async (req: Request, res: Response) => {
  // fetching existing devices with the particular Id
  const response = await Device.findById(req.params.id);
  if (!response) {
    throw new NotFoundError();
  }

  res.json(response).status(200);
};

// ===================================================================
const newDevice = async (req: Request, res: Response) => {
  const { device, os, manufacturer } = req.body;
  const numberOfDevices = await Device.find();
  const existingDevice = await Device.findOne({ device });

  // throwing an error if the number of existing device is equal to or above 10
  if (numberOfDevices.length >= 10) {
    throw new BadRequestError("The garage already filled with 10 devices");
  }

  // every model of the device should be unique
  if (existingDevice) {
    throw new BadRequestError("Device already exists");
  }

  // pre-filling the data of the current user who is adding the device
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
const removeDevice = async (req: Request, res: Response) => {
  // removing the existing device where nobody is checked-in with the particular Id
  const device = await Device.findById(req.params.id);
  if (!device) {
    throw new NotFoundError();
  }
  if (device.isCheckedOut === false) {
    throw new BadRequestError("User currently checked-in through this device");
  }
  device.remove({ _id: req.params.id });
  res.json({ message: "Device deleted successfully" });
};

// ===================================================================

export { fetchDevice, checkoutUser, fetchDeviceById, newDevice, removeDevice };
