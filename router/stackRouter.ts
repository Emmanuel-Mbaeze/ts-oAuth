import express from "express";
const router = express.Router();

import { createStack, allStacks } from "../controller/studsStacks";
router.route("/allstacks").get(allStacks);
router.route("/createstack/:id").post(createStack);
// router.route("/:id").get(singleStud).patch(updateStud).delete(deleteStud);

export default router;
