import JobPosting from "../models/jobPosting.model.js";
import mongoose from "mongoose";
import { isValidObjectId } from "../utils/util.js";

// Create a new job posting
export const createJobPosting = async (req, res) => {
  try {
    const { position, description, requirements } = req.body;

    // Input validation
    if (!position || !description || !requirements) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const jobPosting = new JobPosting({
      position,
      description,
      requirements,
    });

    const newJobPosting = await jobPosting.save();
    res.status(201).json(newJobPosting);
  } catch (error) {
    res.status(500).json({ message: "Failed to create job posting" });
  }
};

// Get job posting by job ID
export const getJobPosting = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    const jobPosting = await JobPosting.findById(jobId);
    if (!jobPosting) {
      return res.status(404).json({ message: "Job Posting not found" });
    }

    res.json(jobPosting);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve job posting" });
  }
};

// Get all job postings
export const getAllJobPosting = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find();
    res.json(jobPostings);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve job postings" });
  }
};

// Update job posting by job ID
export const updateJobPosting = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { position, description, requirements } = req.body;

    // Validate ObjectId
    if (!isValidObjectId(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    const jobPosting = await JobPosting.findById(jobId);
    if (!jobPosting) {
      return res.status(404).json({ message: "Job Posting not found" });
    }

    // Update fields only if they are provided in the request body
    if (position) jobPosting.position = position;
    if (description) jobPosting.description = description;
    if (requirements) jobPosting.requirements = requirements;

    jobPosting.updated_at = Date.now();

    const updatedJobPosting = await jobPosting.save();
    res.json(updatedJobPosting);
  } catch (error) {
    res.status(500).json({ message: "Failed to update job posting" });
  }
};

// Delete job posting by job ID
export const deleteJobPosting = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(jobId)) {
      return res.status(400).json({ message: "Invalid Job ID" });
    }

    const jobPosting = await JobPosting.findById(jobId);
    if (!jobPosting) {
      return res.status(404).json({ message: "Job Posting not found" });
    }

    await JobPosting.findByIdAndDelete(jobId);
    res.json({ message: "Job Posting removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job posting" });
  }
};
