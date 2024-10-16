import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Create a new Team schema
const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  organization_id: {
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

// Define the model
const Department = model("Departments", departmentSchema);

export default Department;
