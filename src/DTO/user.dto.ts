import { IsEmail, IsString, Length, IsEnum, IsOptional } from "class-validator";

export enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer",
}

export class CreateUserDto {
  @IsString()
  @Length(3, 30, { message: "Name must be between 3 and 30 characters" })
  name!: string;

  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @IsString()
  @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
  password!: string;

  @IsEnum(UserRole, { message: "Role must be 'admin' or 'customer'" })
  role!: UserRole;
}

export class LoginUserDto {
  @IsEmail({}, { message: "Invalid email format" })
  email!: string;

  @IsString()
  @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
  password!: string;
}

export class RefreshTokenDto {
    @IsString({ message: "Token must be a string" })
    token!: string;
}

export class GetUserDto{
    @IsOptional()
    @IsEnum(UserRole, {message: "Role must be 'admin' or 'customer'"})
    role?: UserRole;
}