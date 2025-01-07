const mongoose = require('mongoose')
const userModel = require('../Models/user.model')
const bcrypt = require('bcryptjs')

const userRegister = async (req, res) => {
     const { name, email, password } = req.body

     try {

          const userExist = await userModel.findOne({ email })
          if (userExist) {
               return res.status(400).json({
                    message: "User already registered",
               });
          }

          const hashPassword = await bcrypt.hash(password, 10)

          const newUserRegister = new userModel({
               name,
               email,
               password: hashPassword
          });

          await newUserRegister.save();
          res.status(201).json({
               message: "User registered successfully",
          });
     } catch (error) {
          res.status(500).json({
               message: error.message,
          });
     }
};


const userLogin = async (req, res) => {
     const { email, password } = req.body

     try {

          const user = await userModel.findOne({ email });
          if (!user) {
               return res.status(404).json({
                    message: "User not found",
               });
          }
          const isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch) {
               return res.status(401).json({
                    message: "Invalid credentials",
               });
          }

          res.status(200).json({
               message: "User login successful",
          });
     } catch (error) {
          res.status(500).json({
               message: error.message,
          });
     }
}


module.exports = { userRegister, userLogin };
