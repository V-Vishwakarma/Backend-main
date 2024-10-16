import Employee from "../models/employee.model.js";
import mongoose from "mongoose";
import { isValidObjectId } from "../utils/util.js";

// Create a new employee
export const createEmployee = async (req, res) => {
  const {
    emp_id,
    name,
    email,
    password,
    phNumber,
    address,
    permanentAddress,
    gender,
    organisation_id,
    role_id,
  } = req.body;

  try {
    // Input validation
    if (
      !emp_id ||
      !name ||
      !email ||
      !password ||
      !phNumber ||
      !address ||
      !permanentAddress ||
      !gender ||
      !organisation_id ||
      !role_id
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // check if employee exist
    const isEmployeeExist = await Employee.find({ email });

    if (isEmployeeExist.length != 0) {
      res.status(200).json({ isNewEmployee: false });
    } else {
      const employee = new Employee({
        emp_id,
        name,
        email,
        password,
        phNumber,
        address,
        permanentAddress,
        gender,
        organisation_id,
        role_id,
      });

      await employee.save();
      res.status(200).json({ isNewEmployee: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to create employee" });
  }
};

// Get employee by ID
export const getEmployee = async (req, res) => {
  try {
    const { id } = req.query;

    const employee = await Employee.findOne({ emp_id: id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve employee" });
  }
};

// Update employee by ID
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      emp_id,
      name,
      email,
      password,
      phNumber,
      address,
      permanentAddress,
      gender,
      organisation_id,
      team_id,
      role_id,
      sallary_id,
      lastOrg_id,
    } = req.body;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    // Update only if the fields are provided in the request body
    const updateData = {};
    if (emp_id) updateData.emp_id = emp_id;
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (phNumber !== undefined) updateData.phNumber = phNumber;
    if (address) updateData.address = address;
    if (permanentAddress) updateData.permanentAddress = permanentAddress;
    if (gender) updateData.gender = gender;
    if (organisation_id) updateData.organisation_id = organisation_id;
    if (team_id !== undefined) updateData.team_id = team_id;
    if (role_id) updateData.role_id = role_id;
    if (sallary_id) updateData.sallary_id = sallary_id;
    if (lastOrg_id) updateData.lastOrg_id = lastOrg_id;

    // Automatically update the updated_at field
    updateData.updated_at = Date.now();

    const employee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Failed to update employee" });
  }
};

// Delete employee by ID
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete employee" });
  }
};
