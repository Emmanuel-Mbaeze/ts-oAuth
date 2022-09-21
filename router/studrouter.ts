import express from "express";
const router = express.Router();

import {
  allStud,
  singleStud,
  updateStud,
  deleteStud,
  createStud,
} from "../controller/studcontroller";
router.route("/").get(allStud);
router.route("/create").post(createStud);
router.route("/:id").get(singleStud).patch(updateStud).delete(deleteStud);

export default router;
