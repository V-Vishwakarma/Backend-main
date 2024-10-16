import LeaveRequest from "../models/LeaveRequest.model.js";
import mongoose from "mongoose";
import { isValidObjectId } from "../utils/util.js";

// Function to create a new leave request
export const createLeaveRequest = async (req, res) => {
  try {
    const { employeeId, leaveType, startDate, endDate, status } = req.body;

    // Validate required fields
    if (!employeeId || !leaveType || !startDate || !endDate || !status) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const leaveRequest = new LeaveRequest({
      employeeId,
      leaveType,
      startDate,
      endDate,
      status,
    });

    const newLeaveRequest = await leaveRequest.save();
    res.status(201).json(newLeaveRequest);
  } catch (error) {
    res.status(500).json({ message: "Failed to create leave request" });
  }
};

// Function to get leave requests by employee ID
export const getLeaveRequest = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(employeeId)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    const leaveRequests = await LeaveRequest.find({ employeeId });
    if (leaveRequests.length === 0) {
      return res.status(404).json({ message: "No leave requests found for this employee" });
    }

    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve leave requests" });
  }
};

// Function to get all leave requests
export const getAllLeaveRequest = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();
    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve leave requests" });
  }
};

// Function to update a leave request by employee ID
export const updateLeaveRequest = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(employeeId)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    const updatedLeaveRequest = await LeaveRequest.findOneAndUpdate(
      { employeeId },
      req.body,
      { new: true }
    );

    if (!updatedLeaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.status(200).json(updatedLeaveRequest);
  } catch (error) {
    res.status(500).json({ message: "Failed to update leave request" });
  }
};

// Function to delete a leave request by employee ID
export const deleteLeaveRequest = async (req, res) => {
  try {
    const { employeeId } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(employeeId)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    const deletedLeaveRequest = await LeaveRequest.findOneAndDelete({ employeeId });

    if (!deletedLeaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.status(200).json({ message: "Leave request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete leave request" });
  }
};
