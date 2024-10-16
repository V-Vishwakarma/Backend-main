//creating router for payroll
import express from "express";
import { createPayroll, getPayrollDetail, updatePayroll, deletePayroll } from "../controllers/payroll.controller.js";
import auth from "../middlewares/authorization.js";

const router = express.Router();

/*Tested*/
//create a payroll
router.post("/",  createPayroll);

//get payroll by employee id
router.get("/:employeeID",  getPayrollDetail);

//update payroll by employee id
router.put("/:employeeID",  updatePayroll);

//delete payroll by employee id
router.delete("/:employeeID",  deletePayroll);
/*-----*/

export default router;