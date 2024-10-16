//create the crud operations for the salary

import express from "express";
import {
  createSalary,
  deleteSalary,
  getAllSalaries,
  getSalary,
  updateSalary,
} from "../controllers/salary.controller.js";

const router = express.Router();

router.get("/getAllSalaries", getAllSalaries);

router.post("/createSalary", createSalary);

router.get("/getSalarybyId/:id", getSalary);

router.put("/updateSalarybyId/:id", updateSalary);

router.delete("/deleteSalarybyId/:id", deleteSalary);

export default router;

