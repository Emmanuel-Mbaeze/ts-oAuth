import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";

import studrouter from "./router/studrouter";
import stackrouter from "./router/stackRouter";
import courserouter from "./router/courseRouter";

const port: number = 9080;
const url: string = "mongodb://localhost/mytypescript01DB";

const app = express();
app.use(express.json());

app.use("/students", studrouter);
app.use("/stacks", stackrouter);
app.use("/mycourses", courserouter);

mongoose
  .connect(url)
  .then((): void => {
    console.log("I'm Connected");
  })
  .catch((error): void => {
    console.log(error.message);
  });

app.get("/", (req: Request, res: Response): Response => {
  return res.status(200).json({ message: "welcome" });
});

app.listen(port, (): void => {
  console.log("Finally running");
});
