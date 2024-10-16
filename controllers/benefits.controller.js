import Benefit from "../models/benefits.model.js";
import Employee from "../models/employee.model.js";
import mongoose from "mongoose";
import { isValidObjectId } from "../utils/util.js";

// Create benefit
export const createBenefit = async (req, res) => {
  try {
    const { employeeId, benefitType, startDate, endDate } = req.body;

    // Input validation
    if (!employeeId || !benefitType || !startDate) {
      return res.status(400).json({ message: "Employee ID, Benefit Type, and Start Date are required" });
    }

    // Validate employeeId
    if (!isValidObjectId(employeeId)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    const benefit = new Benefit({ employeeId, benefitType, startDate, endDate });
    await benefit.save();
    res.status(201).json(benefit);
  } catch (error) {
    res.status(500).json({ message: "Failed to create benefit" });
  }
};

// Get benefit by benefit id
export const getBenefit = async (req, res) => {
  try {
    const { benefitId } = req.params;

    // Validate benefitId
    if (!isValidObjectId(benefitId)) {
      return res.status(400).json({ message: "Invalid Benefit ID" });
    }

    const benefit = await Benefit.findById(benefitId).populate("employeeId", "name");
    if (!benefit) {
      return res.status(404).json({ message: "Benefit not found" });
    }

    res.json(benefit);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve benefit" });
  }
};

// Get all benefits
export const getAllBenefits = async (req, res) => {
  try {
    const benefits = await Benefit.find().populate("employeeId", "name");
    res.json(benefits);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve benefits" });
  }
};

// Update benefit
export const updateBenefit = async (req, res) => {
  try {
    const { benefitId } = req.params;
    const { benefitType, startDate, endDate } = req.body;

    // Validate benefitId
    if (!isValidObjectId(benefitId)) {
      return res.status(400).json({ message: "Invalid Benefit ID" });
    }

    // Check for empty update body
    if (!benefitType && !startDate && !endDate) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    const updatedBenefit = await Benefit.findByIdAndUpdate(
      benefitId,
      { benefitType, startDate, endDate },
      { new: true, runValidators: true }
    );
    if (!updatedBenefit) {
      return res.status(404).json({ message: "Benefit not found" });
    }

    res.json(updatedBenefit);
  } catch (error) {
    res.status(500).json({ message: "Failed to update benefit" });
  }
};

// Delete benefit
export const deleteBenefit = async (req, res) => {
  try {
    const { benefitId } = req.params;

    // Validate benefitId
    if (!isValidObjectId(benefitId)) {
      return res.status(400).json({ message: "Invalid Benefit ID" });
    }

    const deletedBenefit = await Benefit.findByIdAndDelete(benefitId);
    if (!deletedBenefit) {
      return res.status(404).json({ message: "Benefit not found" });
    }

    res.json({ message: "Benefit removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete benefit" });
  }
};

// Retrieve benefits for a specific employee by id
export const getEmployeeBenefits = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Validate employeeId
    if (!isValidObjectId(employeeId)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const benefits = await Benefit.find({ employeeId });
    res.json(benefits);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve employee benefits" });
  }
};
