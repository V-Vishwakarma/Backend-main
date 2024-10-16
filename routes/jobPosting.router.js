//creating a router for job posting

import express from "express";
import { createJobPosting, getJobPosting, getAllJobPosting, updateJobPosting, deleteJobPosting } from "../controllers/jobPosting.controller.js";
import auth from "../middlewares/authorization.js"

const router = express.Router();

/* Tested */

router.post("/",   createJobPosting);

//get job posting by job id
router.get("/:jobId", getJobPosting);

//get all job posting
router.get("/", getAllJobPosting);

//update job posting
router.put("/:jobId", updateJobPosting);

//delete job posting
router.delete("/:jobId", deleteJobPosting);

/*-----*/

export default router;