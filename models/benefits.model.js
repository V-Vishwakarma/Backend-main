//creating a schema for benefits
import mongoose from "mongoose";

const benefitsSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
      },
      benefitType: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: Date,
    });

const Benefits = mongoose.model("Benefits", benefitsSchema);

export default Benefits;