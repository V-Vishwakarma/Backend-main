import Applicant from "../models/applicant.model.js";
import { isValidObjectId } from "../utils/util.js";

// Creating an applicant
export const createApplicant = async (req, res) => {
  try {
    const { jobId, name, email, resume, coverLetter } = req.body;

    // Input validation
    if (!jobId || !name || !email) {
      return res.status(400).json({ message: "Job ID, Name, and Email are required" });
    }

    // Check for duplicate email
    const existingApplicant = await Applicant.findOne({ email });
    if (existingApplicant) {
      return res.status(409).json({ message: "Applicant with this email already exists" });
    }

    const applicant = new Applicant({ jobId, name, email, resume, coverLetter });
    const newApplicant = await applicant.save();
    res.status(201).json(newApplicant);
  } catch (error) {
    res.status(500).json({ message: "Failed to create applicant" });
  }
};

// Getting applicant by applicant id
export const getApplicant = async (req, res) => {
  try {
    const { applicantId } = req.params;

    // Validate applicantId
    if (!isValidObjectId(applicantId)) {
      return res.status(400).json({ message: "Invalid applicant ID" });
    }

    const applicant = await Applicant.findById(applicantId);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.json(applicant);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve applicant" });
  }
};

// Getting all applicants
export const getAllApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve applicants" });
  }
};

// Updating applicant
export const updateApplicant = async (req, res) => {
  try {
    const { applicantId } = req.params;
    const { name, email, resume, coverLetter } = req.body;

    // Validate applicantId
    if (!isValidObjectId(applicantId)) {
      return res.status(400).json({ message: "Invalid applicant ID" });
    }

    const applicant = await Applicant.findById(applicantId);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    applicant.name = name || applicant.name;
    applicant.email = email || applicant.email;
    applicant.resume = resume || applicant.resume;
    applicant.coverLetter = coverLetter || applicant.coverLetter;

    const updatedApplicant = await applicant.save();
    res.json(updatedApplicant);
  } catch (error) {
    res.status(500).json({ message: "Failed to update applicant" });
  }
};

// Deleting applicant
export const deleteApplicant = async (req, res) => {
  try {
    const { applicantId } = req.params;

    // Validate applicantId
    if (!isValidObjectId(applicantId)) {
      return res.status(400).json({ message: "Invalid applicant ID" });
    }

    const applicant = await Applicant.findByIdAndDelete(applicantId);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.json({ message: "Applicant removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete applicant" });
  }
};

// Getting applicants by job id
export const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Validate jobId
    if (!isValidObjectId(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const applicants = await Applicant.find({ jobId });
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve job applicants" });
  }
};

// Getting applicant details for a specific job
export const getJobApplicantDetails = async (req, res) => {
  try {
    const { applicantId, jobId } = req.params;

    // Validate applicantId and jobId
    if (!isValidObjectId(applicantId) || !isValidObjectId(jobId)) {
      return res.status(400).json({ message: "Invalid applicant ID or job ID" });
    }

    const applicant = await Applicant.findOne({
      _id: applicantId,
      jobId,
    });
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.json(applicant);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve job applicant details" });
  }
};
