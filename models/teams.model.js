import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Create a new Team schema
const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  organisation_id: {
    type: String,
    required: true,
  },
  department_id: {
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
const Team = model("Teams", teamSchema);

export default Team;