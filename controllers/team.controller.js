import Team from "../models/teams.model.js";

// for creating new team ------------------------------->
const createTeam = async (req, res) => {
  try {
    const { name, organisation_id, department_id } = req.body;

    // Check if the team exists
    const isTeamExist = await Team.findOne({ name });
    if (isTeamExist) {
      res.status(200).json({ isNewTeam: false });
    } else {
      await Team.create({ name, organisation_id, department_id });
      res.status(200).json({ isNewTeam: true });
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  createTeam,
};
