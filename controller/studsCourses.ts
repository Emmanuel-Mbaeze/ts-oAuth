import mongoose from "mongoose";
import stackModel from "../Model/stacks";
import courseModel from "../Model/courseModel";
import { Request, Response } from "express";

type demCourse = {
  name: string;
};

const createCourse = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name } = req.body;

    const buildStudents = await stackModel.findById(req.params.id);
    const buildCourse = await courseModel.create({
      name,
    });

    // buildCourse.stack=buildStudents._id
    buildStudents?.course.push(new mongoose.Types.ObjectId(buildCourse._id));
    buildStudents?.save();

    return res.status(200).json({
      message: "course created",
      data: buildCourse,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const allCourses = async (req: Request, res: Response): Promise<Response> => {
  try {
    const every = await courseModel.find();
    return res.status(200).json({ message: "all courses", data: every });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

export { createCourse, allCourses };
