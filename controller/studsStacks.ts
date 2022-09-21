import studModel from "../Model/studentModel";
import stackModel from "../Model/stacks";
import { Request, Response } from "express";
import mongoose from "mongoose";

type theStack = {
  name: string;
};

const createStack = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name } = req.body;
    const buildStudents = await studModel.findById(req.params.id);
    const buildStack = await stackModel.create({
      name,
    });

    buildStudents?.stack.push(new mongoose.Types.ObjectId(buildStack._id));
    buildStudents?.save();

    return res
      .status(201)
      .json({ status: "your stack has been created", data: buildStack });
  } catch (error) {
    return res
      .status(404)
      .json({ message: error, status: "this is an  error" });
  }
};

const allStacks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const every = await stackModel.find();
    return res.status(200).json({ message: "all stack", data: every });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
export { createStack, allStacks };
