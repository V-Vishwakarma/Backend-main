import Department from "../models/department.model.js";

// for creating new department ------------------------------->
const createDepartment = async (req, res) => {
  try {
    const { name, organization_id } = req.body;

    // Check if the department exists
    const isDepartmentExist = await Department.findOne({
      name,
      organization_id,
    });
    if (isDepartmentExist) {
      res.status(200).json({ isNewDepartment: false });
    } else {
      await Department.create({ name, organization_id });
      res.status(200).json({ isNewDepartment: true });
    }
  } catch (error) {
    console.log(error, "Backend Error in creating Department");
  }
};

// fetch all departments --------------------------------------->
const fetchDepartments = async (req, res) => {
  const organization_id = req.query.organization_id;
  const departments = await Department.find({ organization_id }, "_id name");
  if (departments) {
    res.status(200).json({ isDepExist: true, departments });
  } else res.status(200).json({ isDepExist: false });
};

export default {
  createDepartment,
  fetchDepartments,
};
