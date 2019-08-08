const DevModel = require("../models/Dev");

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    try {
      const loggedDev = await DevModel.findById(user);
      const targetDev = await DevModel.findById(devId);

      if (!targetDev) {
        return res.status(400).json({ message: "Dev not exists" });
      }
      if (targetDev.likes.includes(loggedDev._id)) {
        console.log("DEU MATCH");
      }
      loggedDev.likes.push(targetDev._id);
      await loggedDev.save();
      return res.json(loggedDev);
    } catch (error) {
      return res.status(500).json({ message: "Error internal" });
    }
  }
};
