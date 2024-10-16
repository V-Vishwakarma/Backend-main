import Role from "../models/role.model.js";
import mongoose from "mongoose";
// for creating a new role ---------------------------->
const createRole = async (req, res) => {
  try {
    const { name, organization_id, department_id, level, report_to, isAdmin } =
      req.body;

    // Check if the role exists
    const isRoleExist = await Role.findOne({ name, organization_id });
    if (isRoleExist) {
      res.status(200).json({ isNewRole: false, roleData: isRoleExist });
    } else {
      await Role.create({
        name,
        organization_id,
        department_id,
        level,
        report_to,
        isAdmin,
      });
      res.status(200).json({ isNewRole: true });
    }
  } catch (error) {
    console.log(error);
  }
};

// for fetching roles by level
const fetchRolesByLevel = async (req, res) => {
  const level = req.query.level;
  const organization_id = req.query.organization_id;
  const isReport_to = req.query.isReport_to;
  try {
    if (isReport_to) {
      const roles = await Role.find(
        {
          organization_id,
          level: { $gt: level },
        },
        "_id name level report_to"
      );
      if (roles.length != 0) {
        res.status(200).json({ isRoleExist: true, roles });
      } else res.status(200).json({ isRoleExist: false });
    } else {
      const roles = await Role.find(
        {
          organization_id,
          level: { $gt: level },
        },
        "_id name level"
      );
      if (roles.length != 0) {
        res.status(200).json({ isRoleExist: true, roles });
      } else res.status(200).json({ isRoleExist: false });
    }
  } catch (error) {
    console.log(error, "Backend Error in fetching roles by level");
  }
};

// fetch roles by level and department id
const fetchRolesByLevelAndDep = async (req, res) => {
  const { level, organization_id, department_id, strictDep } = req.query;
  try {
    const query = {
      organization_id,
      level: { $gt: level },
      ...(strictDep === "true" // Check if strictDep is a string "true"
        ? { department_id } // strictDep is true, match specific department_id
        : { $or: [{ department_id }, { department_id: "N.A." }] }), // strictDep is false, match department_id or "N.A."
    };

    // Perform the search query
    const roles = await Role.find(query, "_id name");

    if (roles) {
      res.status(200).json({ isRoleExist: true, roles });
    } else {
      res.status(200).json({ isRoleExist: false });
    }
  } catch (error) {
    console.log(
      error,
      "Backend Error in fetching roles by level and Department"
    );
  }
};

// fetch roles by id
const fetchRoleById = async (req, res) => {
  const { roleId } = req.query;

  // Validate that roleId is a valid ObjectId format
  if (typeof roleId !== "string" || !mongoose.Types.ObjectId.isValid(roleId)) {
    return res.status(400).send("Invalid Role ID");
  }

  try {
    const objectId = new mongoose.Types.ObjectId(roleId);

    const roleData = await Role.findOne({ _id: objectId }, "name");

    if (!roleData) {
      return res.status(404).send("Role Not Found");
    }

    res.status(200).json({ role: roleData.name });
  } catch (error) {
    console.error("Backend error in fetching role by id:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default {
  createRole,
  fetchRolesByLevel,
  fetchRolesByLevelAndDep,
  fetchRoleById,
};
