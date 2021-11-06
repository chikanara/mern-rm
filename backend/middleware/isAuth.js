const jwt = require("jsonwebtoken")
const User = require("../models/User")
const isAuth = async (req,res,next) => {
    const token = req.headers.authorization 
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        if (!decoded) {
            res.status(403).json("UNAUTHORIZED")    
        } else 
        {
             let currentUer = await User.findById(decoded.userId).select("-password")
             req.user = currentUer
            next()
        }
    } catch (error) {
        res.status(403).json("UNAUTHORIZED")
    }
}
module.exports = isAuth