const { body, validationResult } = require('express-validator');

const registerRules = () => [
    body('name',"name is required").notEmpty(),
    body('lastName',"lastName is required").notEmpty(),
    body("email","not a valid email").isEmail(),
    body("password","password should  be at least 6 characters").isLength({min:6})
    

]

const loginRules = () => [
    body("email","not a valid email").isEmail(),
    body("password","password should  be at least 6 characters").isLength({min:6})
]

const bodyValidator = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array().map(error => error.msg)[0] });
    }
    else {
        next()
    }
}
module.exports = {registerRules,bodyValidator,loginRules}
