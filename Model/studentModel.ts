import mongoose from "mongoose";

type myStuds = {
  name: string;
  height: number;
  short: boolean;
  color: string;
  isVerified: boolean;
  password: string;
  verifiedToken: string;
  email: string;
  _doc: any;
  stack: {}[];
};

interface students extends myStuds, mongoose.Document {}

const studSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    height: {
      type: Number,
    },
    short: {
      type: Boolean,
    },
    color: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    verifiedToken: {
      type: String,
    },
    stack: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stacks",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<students>("Studs", studSchema);
