import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// import docs from './docs'
// route imports
import { globalErrorhandler } from "./middlewares/globalerrorhandler.middleware";
import { userRouter } from "./routes";
import { IRequest } from "./utils/errors";
import respond from "./utils/respond";

// define global... types for middleware
declare global {
  namespace Express {
    interface Request extends IRequest {}
  }
}

// init
const app = express();

// initialize middleware
app.use(helmet()); // for security
app.use(
  cors({
    origin: ["*"],
    optionsSuccessStatus: 200,
  })
);

// if (process.env.NODE_ENV == NODE_ENV.dev)
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.get("/", (req, res) => {
  res.send("Welcome to VZY Test API api");
});

// routes
app.use("/users", userRouter);

app.use("*", (req, res) => {
  return respond(res, 404, `endpoint not found!`);
});

app.use(globalErrorhandler);

export default app;
