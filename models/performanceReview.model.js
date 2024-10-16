//creating a schema for performance review with fields "employeeId": "string", "reviewDate": "ISODate", "feedback": "string"

import mongoose from "mongoose";

const performanceReviewSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
    },
    reviewDate: {
        type: Date,
        required: true,
    },
    feedback: {
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

const PerformanceReview = mongoose.model("PerformanceReview", performanceReviewSchema);

export default PerformanceReview;