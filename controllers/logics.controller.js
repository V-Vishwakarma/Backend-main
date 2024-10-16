import { calculateSalaryComponents } from "../utils/util.js";

const calculateSallary = (req, res) => {
  const ctc = req.query.ctc;

  const response = calculateSalaryComponents(ctc);
  res.status(200).json({ sallaryComponent: response });
};

export default {
  calculateSallary,
};
