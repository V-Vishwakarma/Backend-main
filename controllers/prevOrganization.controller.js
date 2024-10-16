import PrevOrganization from "../models/prevOrganization.model.js";

// Create and Save a new PrevOrganization
export const createPrevOrganization = async (req, res) => {
  try {
    const { employeeId, organizationName = "", designation = "", lastCTC = 0, joiningDate = null, leavingDate = null } = req.body;

    const prevOrganization = new PrevOrganization({
      employeeId,
      organizationName: organizationName || "",
      designation: designation || "", 
      lastCTC: lastCTC || 0, 
      joiningDate: joiningDate || null, 
      leavingDate: leavingDate || null,
    });

    const savedPrevOrganization = await prevOrganization.save();
    res.status(201).json(savedPrevOrganization);
  } catch (error) {
    console.error("Error creating prevOrganization:", error);
    res.status(400).json({ message: error.message });
  }
};


// Find a single prevOrganization with an employeeId
export const getPrevOrganization = async (req, res) => {
  const employeeId = req.params.employeeId;
  try {
    const prevOrganization = await PrevOrganization.findOne({ employeeId });
    if (!prevOrganization) {
      return res.status(404).json({ message: 'PrevOrganization not found' });
    }
    res.status(200).json(prevOrganization);
  } catch (error) {
    console.error("Error retrieving prevOrganization:", error);
    res.status(500).json({ message: error.message || "Some error occurred while retrieving prevOrganization." });
  }
};

// Update a prevOrganization identified by the employeeId in the request
export const updatePrevOrganization = async (req, res) => {
  const employeeId = req.params.employeeId;
  try {
    const prevOrganization = await PrevOrganization.findOneAndUpdate({ employeeId }, req.body, { new: true });
    if (!prevOrganization) {
      return res.status(404).json({ message: 'PrevOrganization not found' });
    }
    res.status(200).json(prevOrganization);
  } catch (error) {
    console.error("Error updating prevOrganization:", error);
    res.status(500).json({ message: error.message || "Some error occurred while updating prevOrganization." });
  }
};

// Delete a prevOrganization with the specified employeeId in the request
export const deletePrevOrganization = async (req, res) => {
  const employeeId = req.params.employeeId;
  try {
    const prevOrganization = await PrevOrganization.findOneAndRemove({ employeeId });
    if (!prevOrganization) {
      return res.status(404).json({ message: 'PrevOrganization not found' });
    }
    res.status(200).json({ message: 'PrevOrganization deleted successfully!' });
  } catch (error) {
    console.error("Error deleting prevOrganization:", error);
    res.status(500).json({ message: error.message || "Some error occurred while deleting prevOrganization." });
  }
};