//creating a payroll schema with fields employeeID salary bonuses and deductions

import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    bonuses: {
        type: Number,
        required: true,
    },
    deductions: {
        type: Number,
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

const Payroll = mongoose.model("Payroll", payrollSchema);

export default Payroll;
