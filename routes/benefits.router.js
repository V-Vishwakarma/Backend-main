//create a router for benefits
import express from "express";
import { createBenefit, getBenefit, getAllBenefits, updateBenefit, deleteBenefit , getEmployeeBenefits } from "../controllers/benefits.controller.js";
import auth from "../middlewares/authorization.js"

const router = express.Router();

/* Tested */

// create benefit
router.post("/", createBenefit);

// get benefit by benefit id
router.get("/:benefitId", getBenefit);

// get all benefits
router.get("/", getAllBenefits);

// update benefit
router.put("/:benefitId", updateBenefit);

// delete benefit
router.delete("/:benefitId", deleteBenefit);

/*******/

//retrieve benefits for a specific employee by id
router.get("/:employeeId", getEmployeeBenefits);  //to be tested


export default router;