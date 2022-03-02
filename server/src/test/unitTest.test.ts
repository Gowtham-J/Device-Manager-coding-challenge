import {
  newDevice,
  fetchDevice,
  fetchDeviceById,
  removeDevice,
} from "../controller/deviceController";
import { Device } from "../models/devices";
import { Request, Response } from "express";

const newMockDevice = require("./mockData/newDevice.json");
const httpMocks = require("node-mocks-http");

jest.mock("../models/devices");

let res: Response, req: Request, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("unit test on the controllers", () => {
  beforeEach(() => {
    req.body = newMockDevice;
  });
  it("it should be function", () => {
    expect(typeof newDevice).toBe("function");
  });
  it("it should call cerate Device model", () => {
    newDevice(req, res);
    expect(Device.create).toBeCalledWith(newMockDevice);
  });
});
