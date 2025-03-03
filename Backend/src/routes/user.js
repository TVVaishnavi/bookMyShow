const express = require("express")
const {createUser, login, refreshToken} = require("../controller/user")
const router = express.Router()
const cors = require("cors")
const authentication = require("../middleware/authentication")

router.use(cors())
router.post("/register", createUser)
router.post("^/admin/login$|/user/login",login)
router.post("/refresh-token",refreshToken)

module.exports = router;