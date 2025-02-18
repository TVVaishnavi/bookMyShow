const userService = require("../src/service/user");
const User = require("../src/model/user");
const jwtToken = require("../src/config/jwtToken");
const bcrypt = require("bcrypt");

jest.mock("../src/model/user");
jest.mock("../src/config/jwtToken");  // Mock jwtToken correctly
jest.mock("bcrypt");

describe('User Service Tests', () => {
  // Test for createUser function
  test('should create a new user', async () => {
    const mockUserData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    // Mock bcrypt.hash to return a hashed password
    bcrypt.hash.mockResolvedValue("hashedPassword");

    // Mock the save method of the User model to return the user
    User.prototype.save.mockResolvedValue(mockUserData);

    const user = await userService.createUser(mockUserData);

    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("john@example.com");
    expect(User.prototype.save).toHaveBeenCalledTimes(1);
  });

  // Test for login function
  test('should login a user and return a token', async () => {
    const mockUser = {
      email: "john@example.com",
      password: "hashedPassword",
      role: "user",
    };

    // Mock bcrypt.compare to return true
    bcrypt.compare.mockResolvedValue(true);

    // Mock the User.findOne method to return the mock user
    User.findOne.mockResolvedValue(mockUser);

    // Mock jwtToken.generateToken to return a token
    jwtToken.generateToken.mockResolvedValue("mockToken");

    const result = await userService.login(mockUser.email, "password123");

    expect(result.token).toBe("mockToken");
    expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
  });

  // Test for refreshToken function
  test('should refresh the token successfully', async () => {
    const oldToken = "mockOldToken";
    const mockUser = {
      _id: "user123",
      email: "john@example.com",
    };

    // Mock jwtToken.verify to decode the token and return the user ID
    jwtToken.verify = jest.fn().mockResolvedValue({ id: "user123" });  // Ensure verify is mocked like this

    // Mock User.findById to return the mock user
    User.findById.mockResolvedValue(mockUser);

    // Mock jwtToken.generateToken to return a new token
    jwtToken.generateToken.mockResolvedValue("newMockToken");

    const result = await userService.refreshToken(oldToken);

    expect(result).toBe("newMockToken");
    expect(User.findById).toHaveBeenCalledWith("user123");
  });
});
