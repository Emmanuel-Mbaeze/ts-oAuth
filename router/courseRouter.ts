import express from "express";
const router = express.Router();

import { createCourse, allCourses } from "../controller/studsCourses";
router.route("/allcourses").get(allCourses);
router.route("/createcourse/:id").post(createCourse);
// router.route("/:id").get(singleStud).patch(updateStud).delete(deleteStud);

export default router;
