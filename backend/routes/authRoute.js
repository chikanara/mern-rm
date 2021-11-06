const { register, login, getCurrentUser } = require("../controllers/authCtrl")
const { registerRules, bodyValidator, loginRules } = require("../middleware/bodyValidator")
const isAuth = require("../middleware/isAuth")

const router = require("express").Router()

router.post("/register",registerRules(),bodyValidator,register)
router.post('/login',loginRules(),bodyValidator,login)
router.get("/current",isAuth,getCurrentUser)


module.exports = router