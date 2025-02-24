const userService = require("../src/service/user")
const User = require("../src/model/user")
const jwtToken = require("../src/config/jwtToken")
const bcrypt = require("bcrypt")

jest.mock("../src/model/user")
jest.mock("../src/config/jwtToken")  
jest.mock("bcrypt")

describe('User Service Tests', () => {
 
  test('should create a new user', async () => {
    const mockUserData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    }

    bcrypt.hash.mockResolvedValue("hashedPassword")
    User.prototype.save.mockResolvedValue(mockUserData)

    const user = await userService.createUser(mockUserData)

    expect(user.name).toBe("John Doe")
    expect(user.email).toBe("john@example.com")
    expect(User.prototype.save).toHaveBeenCalledTimes(1)
  })

  test('should login a user and return a token', async () => {
    const mockUser = {
      email: "john@example.com",
      password: "hashedPassword",
      role: "user",
    }

    bcrypt.compare.mockResolvedValue(true)

    User.findOne.mockResolvedValue(mockUser)

    jwtToken.generateToken.mockResolvedValue("mockToken")

    const result = await userService.login(mockUser.email, "password123")

    expect(result.token).toBe("mockToken")
    expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email })
  })
  test('should refresh the token successfully', async () => {
    const oldToken = "mockOldToken"
    const mockUser = {
      _id: "user123",
      email: "john@example.com",
    }

    jwtToken.verify = jest.fn().mockResolvedValue({ id: "user123" })  

    User.findById.mockResolvedValue(mockUser)

    jwtToken.generateToken.mockResolvedValue("newMockToken")

    const result = await userService.refreshToken(oldToken)

    expect(result).toBe("newMockToken")
    expect(User.findById).toHaveBeenCalledWith("user123")
  })
})
