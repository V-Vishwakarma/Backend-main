import Payroll from "../models/payroll.model.js";
import mongoose from "mongoose";
import { isValidObjectId } from "../utils/util.js";

// Function to create a payroll
export const createPayroll = async (req, res) => {
  try {
    const { employeeID, salary, bonuses, deductions } = req.body;

    // Validate required fields
    if (!employeeID || !salary || !bonuses || !deductions) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const payroll = new Payroll({ employeeID, salary, bonuses, deductions });
    const newPayroll = await payroll.save();
    res.status(201).json(newPayroll);
  } catch (error) {
    res.status(500).json({ message: "Failed to create payroll", error: error.message });
  }
};

// Function to get payroll details by employee ID
export const getPayrollDetail = async (req, res) => {
  try {
    const { employeeID } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(employeeID)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    const payroll = await Payroll.findOne({ employeeID });
    if (!payroll) {
      return res.status(404).json({ message: "Payroll not found" });
    }

    res.status(200).json(payroll);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve payroll details", error: error.message });
  }
};

// Function to update payroll by employee ID
export const updatePayroll = async (req, res) => {
  try {
    const { employeeID } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(employeeID)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    const updatedPayroll = await Payroll.findOneAndUpdate(
      { employeeID },
      req.body,
      { new: true }
    );

    if (!updatedPayroll) {
      return res.status(404).json({ message: "Payroll not found" });
    }

    res.status(200).json(updatedPayroll);
  } catch (error) {
    res.status(500).json({ message: "Failed to update payroll", error: error.message });
  }
};

// Function to delete payroll by employee ID
export const deletePayroll = async (req, res) => {
  try {
    const { employeeID } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(employeeID)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    const deletedPayroll = await Payroll.findOneAndDelete({ employeeID });

    if (!deletedPayroll) {
      return res.status(404).json({ message: "Payroll not found" });
    }

    res.status(200).json({ message: "Payroll deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete payroll", error: error.message });
  }
};
