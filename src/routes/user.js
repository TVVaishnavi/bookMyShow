const express = require("express")
const {createUser, login, refreshToken} = require("../controller/user")
const router = express.Router()
const cors = require("cors")

router.use(cors())
router.post("/register", createUser)
router.route("^/admin/login$|/user/login").post(login)
router.route("/refresh-token").post(refreshToken)

module.exports = router;