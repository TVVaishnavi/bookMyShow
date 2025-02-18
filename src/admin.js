const User = require("./models/user");
const bcrypt = require("bcrypt");


const createAdminAccount = async()=>{
    const email = process.env.ADMIN_EMAIL;
    try {
        const existingAdmin = await User.findOne({email});
        if(!existingAdmin){
            const newAdmin = new User({
                email,
                name : "Admin",
                password : await bcrypt.hash("admin", 10),
                role : "admin"
            })
            await newAdmin.save();
            console.log("Admin account created successfully");
        }else{
            console.log("Admin already exists");
        }
    } catch (err) {
        console.error(err.message)
    }
};

module.exports = createAdminAccount;