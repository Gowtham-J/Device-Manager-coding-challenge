import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import CreateError from "http-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";

//  local modules
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import cookieParser from "cookie-parser";

// Routers path
import {
  signinRouter,
  signoutRouter,
  signupRouter,
  currentUserRouter,
} from "./routes/auth";
import { deviceRouter } from "./routes/devices/deviceRoutes";
const app = express();

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
    path: "/",
  })
);

//-------------Router endpoints
// Auth endpoints
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

// Device endpoints
app.use("/devices", deviceRouter);
// =========================

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
