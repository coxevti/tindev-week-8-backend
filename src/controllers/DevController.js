const axios = require('axios')
const DevModel = require('../models/Dev')

module.exports = {
  async index(req, res) {
    const { user } = req.headers;
    if (!user) {
      return res.status(422).json({ message: 'user field required' });
    } else {
      try {
        const loggedDev = await DevModel.findById(user);
        const users = await DevModel.find({
          $and: [
            { _id: { $ne: user } },
            { _id: { $nin: loggedDev.likes } },
            { _id: { $nin: loggedDev.dislike } }
          ]
        });
        return res.json(users);
      } catch (error) {
        return res.status(400).json({ message: 'Error internal' })
      }
    }
  },
  async store(req, res) {
    const { username } = req.body
    if (!username) {
      return res.status(422).json({ message: 'username field required' })
    } else {
      try {
        const userExists = await DevModel.findOne({ user: username })
        if (userExists) {
          return res.json(userExists);
        }
        const response = await axios.get(`https://api.github.com/users/${username}`)
        const { name, bio, avatar_url: avatar } = response.data
        const user = await DevModel.create({
          name,
          user: username,
          bio,
          avatar
        })
        return res.json(user)
      } catch (error) {
        return res.status(error.response.status).json(error.response.data)
      }
    }
  }
}