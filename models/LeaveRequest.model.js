//creating  a schema for the leave request with these fileds {"employeeId": "string", "leaveType": "string","startDate": "ISODate","endDate": "ISODate","status": "string"}

import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
    },
    leaveType: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
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

const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);

export default LeaveRequest;