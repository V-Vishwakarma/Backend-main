import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Creating a new Organisation schema
const organisationSchema = new Schema({
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
  phone_No: {
    type: Number,
    require: true,
  },
  field_of_work: {
    type: String,
    require: true,
  },
  no_of_employee: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    default: "",
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

// Defining the model
const Organization = model("Organization", organisationSchema);

export default Organization;
