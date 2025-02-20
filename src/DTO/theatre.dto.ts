import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateTheatreDTO {
    @IsString()
    @IsNotEmpty({message: "Theatre name is required"})
    name!: string;

    @IsString()
    @IsNotEmpty({message: "Location is required"})
    location!: string;

    @IsNumber()
    @IsNotEmpty()
    capacity!: number;
}

export class UpdateTheatreDTO {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsNumber()
    @IsOptional()
    capacity?: number;
}
