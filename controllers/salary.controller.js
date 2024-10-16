import Employee from "../models/employee.model.js";
import Role from "../models/role.model.js";
import Salary from "../models/salary.model.js";

// Create and Save a new Salary
export const createSalary = async (req, res) => {
  try {
    const {
      employeeId,
      accountNumber,
      IFSCCode,
      bankName,
      pfNumber,
      esiId,
      uan_no,
      ctc,
    } = req.body;

    const employee = await Employee.findOne({ emp_id: employeeId }); // Assuming customId is the field where "PPZ005" is stored

    if (!employee) {
      return res.status(200).json({ isSallaryAdded: false });
    }

    const salary = new Salary({
      employeeId,
      accountNumber,
      IFSCCode,
      bankName,
      pfNumber,
      esiId,
      uan_no,
      designation: employee.role_id,
      ctc,
    });

    const savedSalary = await salary.save();
    res.status(200).json({ isSallaryAdded: true });
  } catch (error) {
    res.status(400).json({ message: "Backend Error in Adding Sallary" });
  }
};

// Retrieve and return all salaries from the database.
export const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.send(salaries);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving salaries.",
    });
  }
};

// Find a single salary with an employeeId
export const getSalary = async (req, res) => {
  const id = req.params.id;
  try {
    const salary = await Salary.findById(id);
    if (!salary) {
      return res
        .status(404)
        .send({ message: "Salary not found with id " + id });
    }
    res.send(salary);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .status(404)
        .send({ message: "Salary not found with id " + id });
    }
    return res
      .status(500)
      .send({ message: "Error retrieving salary with id " + id });
  }
};

// Update a salary identified by the employeeId in the request
export const updateSalary = async (req, res) => {
  const id = req.params.id;
  try {
    const salary = await Salary.findByIdAndUpdate(id, req.body, { new: true });
    if (!salary) {
      return res
        .status(404)
        .send({ message: "Salary not found with id " + id });
    }
    res.send(salary);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .status(404)
        .send({ message: "Salary not found with id " + id });
    }
    return res
      .status(500)
      .send({ message: "Error updating salary with id " + id });
  }
};

// Delete a salary with the specified employeeId in the request
export const deleteSalary = async (req, res) => {
  const id = req.params.id;
  try {
    const salary = await Salary.findByIdAndRemove(id);
    if (!salary) {
      return res
        .status(404)
        .send({ message: "Salary not found with id " + id });
    }
    res.send({ message: "Salary deleted successfully!" });
  } catch (error) {
    if (error.kind === "ObjectId" || error.name === "NotFound") {
      return res
        .status(404)
        .send({ message: "Salary not found with id " + id });
    }
    return res
      .status(500)
      .send({ message: "Could not delete salary with id " + id });
  }
};
