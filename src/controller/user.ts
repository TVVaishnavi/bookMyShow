import {Request, Response} from "express";
import {validate} from "class-validator";
import { CreateUserDto, LoginUserDto, RefreshTokenDto, GetUserDto} from "../DTO/user.dto"; 
import {createUser, login, refreshToken, getUsers} from "../service/user";
import { USER_MESSAGES} from "../constant";

enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest'
}

export const createUserController = async(req: Request, res: Response): Promise<Response>=>{
  try {
    const userDto = Object.assign(new CreateUserDto(), req.body);
    const errors = await validate(userDto);
    if(errors.length>0){
      return res.status(400).json({errors})
    }
    await createUser(userDto);
    return res.status(201).json({message: USER_MESSAGES.CREATED_SUCCESS, permission: true })
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({message: USER_MESSAGES. INTERNAL_ERROR})
  }
}

export const loginController = async(req: Request, res: Response): Promise<Response>=>{
  try {
   const loginDto = Object.assign(new LoginUserDto(), req.body);
   const errors = await validate(loginDto);
   if(errors.length>0){
    return res.status(400).json({errors});
   } 
   const data = await login(loginDto);
   return res.json(data);
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(401).json({message: USER_MESSAGES.INVALID_CREDENTIALS});
  }
}

export const refreshTokenController = async(req: Request, res: Response): Promise<Response>=>{
  try {
    const refreshTokenDto = Object.assign(new RefreshTokenDto(), req.body);
    const errors = await validate(refreshTokenDto);
    if(errors.length>0){
      return res.status(400).json({errors});
    }
    const newToken = await refreshToken(refreshTokenDto.token);
    return res.json({token: newToken});
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(401).json({message: USER_MESSAGES.INVALID_TOKEN});
  }
}

export const getUsersController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const queryDto = new GetUserDto();
    Object.assign(queryDto, req.query);

    const errors = await validate(queryDto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const role: UserRole | undefined = queryDto.role as UserRole | undefined;

    if (!role || !Object.values(UserRole).includes(role)) {
      return res.status(400).json({ message: "Role is required and must be a valid UserRole" });
    }

    const users = await getUsers(role);
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: USER_MESSAGES.INTERNAL_ERROR });
  }
};