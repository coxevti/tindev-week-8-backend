const DevModel = require('../models/Dev')

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;
    try {
      const loggedDev = await DevModel.findById(user);
      const targetDev = await DevModel.findById(devId);
      if (!targetDev) {
        return res.status(400).json({ message: 'Dev not exists' })
      }
      if (loggedDev.dislikes.includes(targetDev._id)) {
        return res.json(loggedDev)
      }
      loggedDev.dislikes.push(targetDev._id);
      await loggedDev.save();
      return res.json(loggedDev);
    } catch (error) {
      return res.status(500).json({ message: 'Error internal' })
    }
  }
}