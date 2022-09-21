import mongoose from "mongoose";

type theCourse = {
  name: string;
  stack: [];
};

interface myCourse extends theCourse, mongoose.Document {}

const Courses = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    stack: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stacks",
    },
  },
  { timestamps: true }
);

export default mongoose.model<myCourse>("courses", Courses);
