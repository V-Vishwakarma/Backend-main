//creating router for leave request

import express from "express";
import { createLeaveRequest, getLeaveRequest, getAllLeaveRequest, updateLeaveRequest, deleteLeaveRequest } from "../controllers/leave.controller.js";
import auth from "../middlewares/authorization.js"

const router = express.Router();

router.post("/",   createLeaveRequest);

/* Tested */

//get leave request by employee id
router.get("/:employeeId", getLeaveRequest);

//get all leave request
router.get("/", getAllLeaveRequest);

//update leave request
router.put("/:employeeId" , updateLeaveRequest);

//delete leave request
router.delete("/:employeeId" , deleteLeaveRequest);

/*-----*/

export default router;