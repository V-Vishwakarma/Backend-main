import mongoose from "mongoose";
import QRCode from "qrcode";
export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const calculateSalaryComponents = (ctc) => {
  // Calculate basic salary, HRA, and CA
  const basicSalary = ctc * 0.6;
  const hra = ctc * 0.3;
  const ca = ctc * 0.1;

  // Calculate PF from employee and employer
  const pfEmployee = basicSalary * 0.1237;
  const pfEmployer = basicSalary * 0.1361;

  // Calculate ESI from employee and employer
  const esiEmployee = basicSalary * 0.0075;
  const esiEmployer = basicSalary * 0.0325;

  // Calculate the final salary
  const finalSalary = ctc - (pfEmployee + esiEmployee);

  // Return all components as an object
  return {
    basicSalary: basicSalary,
    hra: hra,
    ca: ca,
    pfEmployee: pfEmployee,
    pfEmployer: pfEmployer,
    esiEmployee: esiEmployee,
    esiEmployer: esiEmployer,
    finalSalary: finalSalary,
  };
};

export const generateQRCode = async (employeeId) => {
  const url = `https://placementplaza.com/employee_detail/${employeeId}`;
  try {
    const base64QRCode = await QRCode.toDataURL(url);
    return base64QRCode;
  } catch (err) {
    console.error("Error generating QR Code", err);
    throw err;
  }
};
