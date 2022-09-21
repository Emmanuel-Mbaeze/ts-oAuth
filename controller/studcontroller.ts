import studModel from "../Model/studentModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import emailCheck from "../sendMail";

type myStuds = {
  name: string;
  height: number;
  short: boolean;
  color: string;
};

const allStud = async (req: Request, res: Response): Promise<Response> => {
  try {
    const all = await studModel.find();
    return res.status(200).json({
      message: "Gotten All",
      data: all,
    });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

const singleStud = async (req: Request, res: Response): Promise<Response> => {
  try {
    const all = await studModel.findById(req.params.id);
    return res.status(201).json({
      message: `This is ${all?.name}`,
      data: all,
    });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

const updateStud = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, color, height, short } = req.body;
    const updates = await studModel.findByIdAndUpdate(
      req.params.id,
      { name, color, height, short },
      { new: true }
    );
    return res
      .status(201)
      .json({ message: `${updates?.name} has been updated`, data: updates });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

const deleteStud = async (req: Request, res: Response): Promise<Response> => {
  try {
    const deletes = await studModel.findByIdAndDelete(req.params.id);
    return res.status(204).json({ message: "user has been deleted`" });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

const createStud = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, color, height, short } = req.body;
    if (height > 200) {
      const build: myStuds | null = await studModel.create({
        name,
        color,
        height,
        short: false,
      });
      return res.status(200).json({
        message: `${build?.name} your account has been created`,
        data: build,
      });
    } else {
      const { name, color, height, short } = req.body;
      const build = await studModel.create({
        name,
        color,
        height,
        short: true,
      });
      return res.status(200).json({
        message: `${build?.name} your account has been created`,
        data: build,
      });
    }
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

const studSignup = async (req: Request, res: Response) => {
  try {
    const { name, color, height, short, email, password } = req.body;
    if (height > 200) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(salt, password);

      const createStud = await studModel.create({
        name,
        color,
        height,
        email,
        short,
        password: hashed,
      });

      emailCheck(email, createStud._id)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log(err));

      return res.status(200).json({
        message: `${createStud.name} your account has been created`,
        data: createStud,
      });
    } else {
    }
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

const verifyUser = async (req: Request, res: Response) => {
  try {
    const user = await studModel.findById(req.params.id);
    if (user) {
      if (user.verifiedToken !== "") {
        await studModel.findByIdAndUpdate(
          req.params.id,
          {
            isVerified: true,
            verifiedToken: "",
          },
          { new: true }
        );
        return res.status(201).json({ message: "verificaton Complete" });
      } else {
        return res.status(500).json({ message: "verification failed" });
      }
    } else {
      return res.status(500).json({ message: "user not found" });
    }
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await studModel.findOne({ email });

    if (user) {
      const check = await bcrypt.compare(password, user.password);
      if (check) {
        if (user.isVerified && user.verifiedToken === "") {
          const token = jwt.sign(
            { _id: user._id, isVerified: user.isVerified },
            "wtf",
            { expiresIn: "1d" }
          );

          const { password, ...info } = user._doc;
          return res.status(201).json({
            message: "welcome back ${user?.name}",
            data: { token, ...info },
          });
        } else {
        }
      } else {
        return res.status(500).json({ message: " incorrect password " });
      }
    } else {
      return res.status(500).json({ message: "student not found" });
    }
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
export { allStud, singleStud, updateStud, deleteStud, createStud };
