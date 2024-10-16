import Organization from "../models/organisation.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
// for creating organization -------------------------------------->
const createOrg = async (req, res) => {
  try {
    const { name, email, password, phone_No, field_of_work, no_of_employee } =
      req.body;

    // Hasing password before storing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Check if the organization exists
    const isOrgExist = await Organization.findOne({ email });
    if (isOrgExist) {
      res.status(200).json({ isNewOrg: false });
    } else {
      await Organization.create({
        name,
        email,
        password: hashedPassword,
        phone_No,
        field_of_work,
        no_of_employee,
      });

      // Generating token
      const token = jwt.sign({ email }, "secretKey", {
        expiresIn: "1h",
      });

      // Saving token in cookie
      res.cookie("authToken", token, { httpOnly: true });
      res.status(200).json({ isNewOrg: true });
    }
  } catch (error) {
    res.status(403).send("Backend-error in creating Org");
    console.log(error);
  }
};

// for fetching org id ---------------------------------------->
const fetchOrgId = async (req, res) => {
  const email = req.query.email;

  // check if email is sent
  if (email != undefined) {
    const id = await Organization.findOne(
      { email },
      { projection: { _id: 1 } }
    );
    if (id) {
      res.status(200).json({ isId: true, id: id._id });
    } else {
      res.status(200).json({ isId: false });
    }
  } else res.status(400).json({ msg: "email is required" });
};

// deleting organization
const deleteOrg = async (req, res) => {
  const organization_id = req.query.organization_id;

  // Construct the _id object as expected by your schema
  const objectId = new mongoose.Types.ObjectId(organization_id);
  try {
    const deleteOrganization = await Organization.findByIdAndDelete(objectId);
    if (deleteOrganization)
      res.status(200).send("Organization and all its data deleted");
    else res.status(404).send("No Organization found");
  } catch (error) {
    console.log(error, "Backend Error in deleting the Organization");
  }
};

export default {
  createOrg,
  fetchOrgId,
  deleteOrg,
};
