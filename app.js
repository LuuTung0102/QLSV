import express, { request } from "express";
import { dbConnection } from "./src/config/dbConnection.js";
import userRouter from "./src/api/routes/userRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./src/middlewares/error.js";

const app = express();
dotenv.config({ path: "./config.env" });

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);

dbConnection();
app.use(errorMiddleware);


export default app;