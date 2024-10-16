import QRModel from "../models/qr.model.js";
import Employee from "../models/employee.model.js";
import { generateQRCode } from "../utils/util.js";

const saveQR = async (req, res) => {
  const { empId } = req.body;
  console.log(empId);

  try {
    // Check whether the empId exists or not
    const employee = await Employee.findOne({ emp_id: empId });

    if (!employee) {
      return res.status(404).json({ msg: "Employee doesn't exist" });
    }

    const qrCode = await generateQRCode(empId);

    // Create a new instance of the QRModel with the generated data
    const qr = new QRModel({
      empId,
      qrCode,
    });

    // Save the instance to the database
    await qr.save();

    res.send("Employee QR Code saved successfully");
  } catch (error) {
    console.error("Backend Error in saving QR", error);
    res.status(500).json({ error: "Error saving employee QR Code" });
  }
};

// New function to get QR Code by employee ID
const getQR = async (req, res) => {
  const { empId } = req.query; // Assuming empId is passed as a URL parameter

  try {
    // Find the QR code for the given employee ID
    const qr = await QRModel.findOne({ empId });

    if (!qr) {
      return res
        .status(404)
        .json({ msg: "QR Code not found for this employee" });
    }

    // Ensure that the qr.qrCode does not include "data:image/png;base64,"
    const base64Data = qr.qrCode.split(",")[1]; // This assumes the format is "data:image/png;base64,BASE64_STRING"

    // Convert base64 to buffer
    const imgBuffer = Buffer.from(base64Data, "base64");

    // Set the correct Content-Type
    res.setHeader("Content-Type", "image/png");

    // Send the image buffer as the response
    res.send(imgBuffer);
  } catch (error) {
    console.error("Backend Error in retrieving QR", error);
    res.status(500).json({ error: "Error retrieving employee QR Code" });
  }
};

export default {
  saveQR,
  getQR,
};
