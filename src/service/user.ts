import { User, IUser } from "../models/user";  
import bcrypt from "bcrypt";
import { generateToken, secretKey } from "../config/jwtToken";
import jwt from "jsonwebtoken";
import { SALT_ROUNDS, AUTH, ERRORS, ACCESS } from "../constant";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const getUsers = async (): Promise<IUser[]> => await User.find({});

const createUser = async ({ name, email, password }: CreateUserInput): Promise<IUser> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error(ERRORS.EMAIL_EXISTS);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();  
  return newUser;  
};

const login = async ({ email, password }: LoginInput): Promise<{ token: string; type?: string }> => {
  try {
    const user: any = await User.findOne({ email });
    if (!user) {
      throw new Error(ERRORS.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(ERRORS.INVALID_CREDENTIALS);
    }

    const token = await generateToken(user);
    return user.role === ACCESS.ADMIN ? { type: ACCESS.ADMIN, token } : { token };
  } catch (error) {
    throw new Error(ERRORS.LOGIN_FAILED);
  }
};

interface DecodedToken {
    id: string;
}

const refreshToken = async (oldToken: string): Promise<string> => {
    try {
      const decoded = jwt.verify(oldToken, AUTH.SECRET) as DecodedToken;

      const user: any = await User.findById(decoded.id);
      if (!user) {
        throw new Error(ERRORS.USER_NOT_FOUND);
      }

      const newToken = await generateToken(user);
      return newToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw new Error(ERRORS.INVALID_TOKEN);
    }
};

export { getUsers, createUser, login, refreshToken };
