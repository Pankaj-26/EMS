import User from './models/User.js'
import bcrypt from 'bcrypt'
import connection from './db/db.js'

const userRegister = async () => {
  try {
    connection()
    const hashPassword = await bcrypt.hash('password', 10)
   

    const newUser = new User({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashPassword,
      role: 'admin',
    })
    await newUser.save()
  } catch (e) {
    console.log(e)
  }
}

userRegister()
