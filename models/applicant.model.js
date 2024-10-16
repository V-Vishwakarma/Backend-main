//creating a schema for applicants

import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPosting',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      resume: {
        type: String,
        required: true,
      },
      coverLetter: String,
      appliedDate: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ['applied', 'interviewing', 'offered', 'hired', 'rejected'],
        default: 'applied',
      },
    });

const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant;