import mongoose from "mongoose";

// create a new Department ----------------->
const employeeSchema = new mongoose.Schema({
  emp_id: {
    type: String,
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
  password: {
    type: String,
    required: true,
  },
  phNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
    default: "N.A.",
  },
  permanentAddress: {
    type: String,
    required: true,
    default: "N.A.",
  },
  gender: {
    type: String,
    required: true,
  },
  organisation_id: {
    type: String,
    required: true,
  },
  team_id: {
    type: String,
    default: "N.A.",
  },
  role_id: {
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

// defining the model
const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
