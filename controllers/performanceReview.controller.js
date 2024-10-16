import PerformanceReview from "../models/PerformanceReview.model.js";
import mongoose from "mongoose";
import { isValidObjectId } from "../utils/util.js";

// Function to schedule a performance review
export const schedulePerformanceReview = async (req, res) => {
  try {
    const { employeeId, reviewDate, feedback } = req.body;

    // Validate required fields
    if (!employeeId || !reviewDate || !feedback) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const performanceReview = new PerformanceReview({ employeeId, reviewDate, feedback });
    const newPerformanceReview = await performanceReview.save();
    res.status(201).json(newPerformanceReview);
  } catch (error) {
    res.status(500).json({ message: "Failed to schedule performance review", error: error.message });
  }
};

// Function to get a performance review by employee ID
export const getPerformanceReview = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(employeeId)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    const performanceReview = await PerformanceReview.find({ employeeId });
    if (performanceReview.length === 0) {
      return res.status(404).json({ message: "Performance review not found" });
    }

    res.status(200).json(performanceReview);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve performance review", error: error.message });
  }
};

// Function to get all performance reviews
export const getAllPerformanceReview = async (req, res) => {
  try {
    const performanceReviews = await PerformanceReview.find();
    res.status(200).json(performanceReviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve performance reviews", error: error.message });
  }
};

// Function to update a performance review by employee ID
export const updatePerformanceReview = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(employeeId)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    const updatedPerformanceReview = await PerformanceReview.findOneAndUpdate(
      { employeeId },
      req.body,
      { new: true }
    );

    if (!updatedPerformanceReview) {
      return res.status(404).json({ message: "Performance review not found" });
    }

    res.status(200).json(updatedPerformanceReview);
  } catch (error) {
    res.status(500).json({ message: "Failed to update performance review", error: error.message });
  }
};

// Function to delete a performance review by employee ID
export const deletePerformanceReview = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(employeeId)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    const deletedPerformanceReview = await PerformanceReview.findOneAndDelete({ employeeId });

    if (!deletedPerformanceReview) {
      return res.status(404).json({ message: "Performance review not found" });
    }

    res.status(200).json({ message: "Performance review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete performance review", error: error.message });
  }
};
