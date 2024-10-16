import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  IFSCCode:{
    type: String,
    required: true
  },
  bankName:{
    type: String,
    required: true
  },
  pfNumber: {
    type: String,
    required: true,
  },
  esiId: {
    type: String,
    required: true,
  },
  uan_no: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  ctc: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Salary = mongoose.model("Salary", salarySchema);

export default Salary;
