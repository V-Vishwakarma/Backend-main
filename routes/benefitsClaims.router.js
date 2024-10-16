//create a router for benefits claims
import express from "express";
import { createBenefitsClaim, getBenefitsClaim, getAllBenefitsClaims, updateBenefitsClaim, deleteBenefitsClaim , getEmployeeBenefitsClaims } from "../controllers/claims.controller.js";
import auth from "../middlewares/authorization.js"

const router = express.Router();

/* Tested */

// create benefits claim
router.post("/",  createBenefitsClaim);

// get benefits claim by benefits claim id
router.get("/:benefitsClaimId",  getBenefitsClaim);

// get all benefits claims
router.get("/",  getAllBenefitsClaims);

// update benefits claim
router.put("/:benefitsClaimId",  updateBenefitsClaim);

// delete benefits claim
router.delete("/:benefitsClaimId",  deleteBenefitsClaim);

/* ***** */

//retrieve benefits claims for a specific employee by id
router.get("/employee/:employeeId",  getEmployeeBenefitsClaims);


export default router;