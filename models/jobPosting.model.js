//creating a schema for job posting with fields "position": "string","description": "string","requirements": "string"

import mongoose from "mongoose";

const jobPostingSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    });

const JobPosting = mongoose.model("JobPosting", jobPostingSchema);

export default JobPosting;