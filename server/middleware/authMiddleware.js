import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const verifyUser = async (req, res, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(404).json({ success: false, error: 'token nor found' })
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    if (!decoded) {
      return res.status(404).json({ success: false, error: 'token not valid' })
    }
    const user = await User.findById({ _id: decoded._id }).select('-password')
    if (!user) {
      return res.status(404).json({ success: false, error: 'user not found' })
    }
    req.user = user
    next()
  } catch (e) {
    return res.status(500).json({ success: false, e: 'server error' })
  }
}

export default verifyUser
