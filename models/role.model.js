import mongoose from "mongoose";

// create a new Department ----------------->
const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organization_id: {
    type: String,
    required: true,
  },
  department_id: {
    type: [String],
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  report_to: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
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
const Role = mongoose.model("Roles", roleSchema);

export default Role;
