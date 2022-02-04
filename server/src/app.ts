import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import "express-async-errors";
import CreateError from "http-errors";
import cookieSession from "cookie-session";
import cors from "cors";
// import * as dotenv from "dotenv";
import "dotenv/config";
import bodyParser from "body-parser";

//  local modules
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import cookieParser from "cookie-parser";
import { AsyncLocalStorage } from "async_hooks";

// Routers path
import {
  signinRouter,
  signoutRouter,
  signupRouter,
  currentUserRouter,
} from "./routes/auth";
import {
  newDeviceRouter,
  fetchDeviceRouter,
  fetchByIdDeviceRouter,
  checkoutRouter,
  removeDeviceRouter,
} from "./routes/devices";

const app = express();

// app.set("trust proxy", true);
app.use(json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.set("trust proxy", 1); // trust first proxy
app.use(cookieParser());
app.use(bodyParser.json());

//

app.use(
  cookieSession({
    signed: false,
    httpOnly: false,
    domain: "localhost",

    secure: false,
    // secure: process.env.NODE_ENV !== "test",
    // domain: window.location.hostname,
    path: "/",
  })
);
const asyncLocalStorage = new AsyncLocalStorage();
app.get("/", (req, res) => {
  const getStor = asyncLocalStorage.getStore();
  const store = localStorage.getItem("jwt");
  console.log(store);
  // req.session = { jwt: "da" };
  res.send("hello");
});

//-------------Router endpoints
// Auth endpoints
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

//  Devices endpoints
app.use(newDeviceRouter);
app.use(fetchDeviceRouter);
app.use(fetchByIdDeviceRouter);
app.use(checkoutRouter);
app.use(removeDeviceRouter);

// ----------  Unknown route handler
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(CreateError(404));
});
// error handler
app.use(errorHandler);

export { app };
