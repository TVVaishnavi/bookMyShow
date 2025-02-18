const mongoose = require("mongoose");
const User = require("../src/model/user"); // Adjust the path as needed
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Mongoose connection options
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    };

    await mongoose.connect(uri, mongooseOpts);
    console.log('Connected to in-memory database');
});

beforeEach(async () => {
    // Clean up the database before each test
    await User.deleteMany();
    console.log('Cleaned up test data');
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log('Closed database connection and stopped server');
});

describe("User Model Test", () => {

    it("should create & save a user successfully", async () => {
        const userData = {
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
            role: "customer",
        };

        const validUser = new User(userData);
        const savedUser = await validUser.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.role).toBe(userData.role);
    });

    it("should not save fields not defined in schema", async () => {
        const userData = {
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
            role: "customer",
            nickname: "Johnny", // This field is not in schema
        };

        const user = new User(userData);
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.nickname).toBeUndefined();  // Mongoose should not save undefined fields
    });

    it("should fail to create a user without required fields", async () => {
        const userData = { name: "John Doe" };  // Missing email and password

        let error;
        try {
            const user = new User(userData);
            await user.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(error.errors.email).toBeDefined();
        expect(error.errors.password).toBeDefined();
    });

});
