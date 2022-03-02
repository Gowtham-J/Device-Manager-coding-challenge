import request from "supertest";
import { Device } from "../../../models/devices";
import { app } from "../../../app";
import { dateValidation } from "../../../helpers/dateValidation";

const mockDeviceData = require("../../../test/mockData/devicesData.json");

const deviceEndpoint = "/devices";
jest.mock("../../../models/devices");
jest.mock("../../../helpers/dateValidation");

describe("Controller testing for devices", () => {
  it("GET demo from /demo", async () => {
    const response = await request(app).get("/demo");
    expect(response.status).toBe(200);

    // console.log("test response", response.body);
    // expect(response.body).toBe("success");
  });
  it("GET devices from " + deviceEndpoint, async () => {
    const response = await request(app).get(deviceEndpoint);
    // console.log("test response", response.body);
    expect(response.status).toBe(200);
    // expect(Array.isArray(response.body)).toBeTruthy();
    // expect(response.body[0].device).toBeDefined();
    // expect(response.body).toBe("success");
  });
  // it("GET devices by ID from " + deviceEndpoint + "/:id", async () => {
  //   const response = await request(app).get(deviceEndpoint + "/:id");
  //   expect(response.status).toBe(200);
  //   // expect(Array.isArray(response.body)).toBeTruthy();
  //   // expect(response.body[0].device).toBeDefined();
  //   // console.log("test response", response.body);
  //   // expect(response.body).toBe("success");
  // });
});
