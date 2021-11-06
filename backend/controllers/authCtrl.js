const User = require("../models/User")
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');

exports.register = async(req,res) => {
    const {email,name,lastName,password} = req.body
    try {
          //check existance user 
        let user = await User.findOne({email})
        if (user) return res.status(400).json({err:"You are already registred"})
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)
        // save user data in db
        let newUser = new User({
            email,name,lastName,password:hash
        })

        await newUser.save()
        // add token
        const payload = {
            userId:newUser._id
        }
        // console.log(payload)
        const token  = jwt.sign(payload,process.env.SECRET_KEY)
        res.status(201).json({token,user:{
            _id:newUser._id,
            email:newUser.email,
            name:newUser.name,
            lastName:newUser.lastName
        }})
    } catch (error) {
        res.status(500).json({err:error.message})
    }

}

exports.login = async(req,res) => {
    const {email,password} = req.body
    try {
          //check existance user 
        let user = await User.findOne({email})
        if (!user) return res.status(400).json({err:"password or email incorrect"})
        // check  password
      
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) return res.status(400).json({err:"password or email incorrect"})
        // add token
        const payload = {
            userId:user._id
        }
        // console.log(payload)
        const token  = jwt.sign(payload,process.env.SECRET_KEY)
        res.status(200).json({
            token,
            _id:user._id,
            email:user.email,
            name:user.name,
            lastName:user.lastName
        })
    } catch (error) {
        res.status(500).json({err:error.message})
    }

}

exports.getCurrentUser = (req,res) => {
    res.status(200).send(req.user)
}
