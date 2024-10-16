import BenefitClaim from "../models/benefitClaim.model.js";
import mongoose from "mongoose";
import { isValidObjectId } from "../utils/util.js";

// Create benefits claim
export const createBenefitsClaim = async (req, res) => {
  try {
    const { employeeId, benefitId, amount, date, status } = req.body;

    // Input validation
    if (!employeeId || !benefitId || !amount) {
      return res.status(400).json({ message: "Employee ID, Benefit ID, and Amount are required" });
    }

    // Validate employeeId and benefitId
    if (!isValidObjectId(employeeId) || !isValidObjectId(benefitId)) {
      return res.status(400).json({ message: "Invalid Employee ID or Benefit ID" });
    }

    const benefitsClaim = new BenefitClaim({
      employeeId,
      benefitId,
      amount,
      date,
      status,
    });
    await benefitsClaim.save();
    res.status(201).json(benefitsClaim);
  } catch (error) {
    res.status(500).json({ message: "Failed to create benefits claim" });
  }
};

// Get benefits claim by benefits claim ID
export const getBenefitsClaim = async (req, res) => {
  try {
    const { benefitsClaimId } = req.params;

    // Validate benefitsClaimId
    if (!isValidObjectId(benefitsClaimId)) {
      return res.status(400).json({ message: "Invalid Benefits Claim ID" });
    }

    const benefitsClaim = await BenefitClaim.findById(benefitsClaimId)
      .populate("employeeId", "name")
      .populate("benefitId", "benefitType");
    if (!benefitsClaim) {
      return res.status(404).json({ message: "Benefits Claim not found" });
    }

    res.json(benefitsClaim);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve benefits claim" });
  }
};

// Get all benefits claims
export const getAllBenefitsClaims = async (req, res) => {
  try {
    const benefitsClaims = await BenefitClaim.find()
      .populate("employeeId", "name")
      .populate("benefitId", "benefitType");
    res.json(benefitsClaims);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve benefits claims" });
  }
};

// Update benefits claim
export const updateBenefitsClaim = async (req, res) => {
  try {
    const { benefitsClaimId } = req.params;
    const { amount, date, status } = req.body;

    // Validate benefitsClaimId
    if (!isValidObjectId(benefitsClaimId)) {
      return res.status(400).json({ message: "Invalid Benefits Claim ID" });
    }

    // Check for empty update body
    if (!amount && !date && !status) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    const updatedBenefitsClaim = await BenefitClaim.findByIdAndUpdate(
      benefitsClaimId,
      { amount, date, status },
      { new: true, runValidators: true }
    );
    if (!updatedBenefitsClaim) {
      return res.status(404).json({ message: "Benefits Claim not found" });
    }

    res.json(updatedBenefitsClaim);
  } catch (error) {
    res.status(500).json({ message: "Failed to update benefits claim" });
  }
};

// Delete benefits claim
export const deleteBenefitsClaim = async (req, res) => {
  try {
    const { benefitsClaimId } = req.params;

    // Validate benefitsClaimId
    if (!isValidObjectId(benefitsClaimId)) {
      return res.status(400).json({ message: "Invalid Benefits Claim ID" });
    }

    const deletedBenefitsClaim = await BenefitClaim.findByIdAndDelete(benefitsClaimId);
    if (!deletedBenefitsClaim) {
      return res.status(404).json({ message: "Benefits Claim not found" });
    }

    res.json({ message: "Benefits Claim removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete benefits claim" });
  }
};

// Retrieve benefits claims for a specific employee by ID
export const getEmployeeBenefitsClaims = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Validate employeeId
    if (!isValidObjectId(employeeId)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    const benefitsClaims = await BenefitClaim.find({ employeeId })
      .populate("benefitId", "benefitType");

    if (!benefitsClaims || benefitsClaims.length === 0) {
      return res.status(404).json({ message: "No benefits claims found for this employee" });
    }

    res.json(benefitsClaims);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve employee benefits claims" });
  }
};
