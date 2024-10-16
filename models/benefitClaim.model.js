//creating a schema for benefit claims

import mongoose from "mongoose";

const benefitClaimSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
      },
      benefitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Benefit',
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
      },
    });

const BenefitClaim = mongoose.model("BenefitClaim", benefitClaimSchema);

export default BenefitClaim;