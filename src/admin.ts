import User from "./models/user";
import bcrypt from "bcrypt";
import { ADMIN, PASSWORD } from "./constant"; 
import dotenv from "dotenv";
dotenv.config();

const createAdminAccount = async (): Promise<void> => {
    const email: string | undefined = process.env["ADMIN_EMAIL"]; 

    try {
        const existingAdmin = await User.findOne({ email });
        if (!existingAdmin) {
            const newAdmin = new User({
                email,
                name: ADMIN.NAME, 
                password: await bcrypt.hash(ADMIN.DEFAULT_PASSWORD, PASSWORD.SALT_ROUNDS), 
                role: ADMIN.ROLE 
            });
            await newAdmin.save();
            console.log("Admin account created successfully");
        } else {
            console.log("Admin already exists");
        }
    } catch (err) {
        console.error((err as Error).message);
    }
};

export default createAdminAccount;
