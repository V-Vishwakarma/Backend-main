//creating router for applicants
import express from "express";
import { createApplicant, getApplicant, getAllApplicants, updateApplicant, deleteApplicant , getJobApplicants , getJobApplicantDetails } from "../controllers/applicants.controller.js";
import auth from "../middlewares/authorization.js"

const router = express.Router();

/* Tested */

// create applicant
router.post("/",  createApplicant);

// get applicant by applicant id
router.get("/:applicantId",  getApplicant);

// get all applicants
router.get("/",  getAllApplicants);

// update applicant
router.put("/:applicantId",  updateApplicant);

// delete applicant
router.delete("/:applicantId",  deleteApplicant);


// get applicants by job id
router.get("/job/:jobId",  getJobApplicants);

// get applicant details for a specific job
router.get("/job/:jobId/applicant/:applicantId",  getJobApplicantDetails);

/* ***** */

export default router;