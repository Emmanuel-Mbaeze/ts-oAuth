import mongoose from "mongoose";

type stack = {
  name: string;
  course: {}[];
};

interface theStacks extends stack, mongoose.Document {}

const myStack = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    stud: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Studs",
    },
    course: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<theStacks>("stacks", myStack);
