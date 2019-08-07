const axios = require('axios')
const DevModel = require('../models/Dev')

module.exports = {
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