const User = require("../src/model/user")
const bcrypt = require("bcrypt")
const login = require("../src/controller/user")
const createAdminAccount = async () => {
const email = process.env.ADMIN_EMAIL

    try {
        const existingAdmin = await User.findOne({ email })
        if (!existingAdmin) {
            const newAdmin = new User({
                email,
                name: "Admin",
                password: await bcrypt.hash("admin", 10),
                role: "admin"
            })
            await newAdmin.save()
            console.log("Admin account created successfully")
            const fakeReq = { body: { email, password: "admin" } }
            const fakeRes = {
                status: (code) => ({
                    json: (data) => {
                        console.log(`Token Response [${code}]:`, data)
                    },
                }),
            }

            await login(fakeReq, fakeRes)
        } else {
            console.log("Admin already exists")
        }
    } catch (err) {
        console.error("Error:", err.message)
    }
}

module.exports = createAdminAccount
