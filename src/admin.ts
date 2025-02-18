import User from "./models/user";
import bcrypt from "bcrypt";

const createAdminAccount = async (): Promise<void> => {
    const email: string | undefined = process.env.ADMIN_EMAIL;
    try {
        const existingAdmin = await User.findOne({ email });
        if (!existingAdmin) {
            const newAdmin = new User({
                email,
                name: "Admin",
                password: await bcrypt.hash("admin", 10),
                role: "admin"
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