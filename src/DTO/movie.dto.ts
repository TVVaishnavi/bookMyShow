import {IsString, IsNumber, IsOptional, IsArray} from "class-validator";

export class CreateMovieDTO {
    @IsString()
    title!: string;

    @IsString()
    director!: string;

    @IsString()
    releaseDate!: string;

    @IsNumber()
    duration!: number;

    @IsArray()
    @IsString({each: true})
    genres!: string[];

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    releaseYear!: number;
}

export class updatedMovieDTO{
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    director?: string;

    @IsOptional()
    @IsString()
    releaseDate?: string;

    @IsOptional()
    @IsNumber()
    duration?: number;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    genres?: string[];

    @IsOptional()
    @IsString()
    description?: string;
}

export class DeleteMovieDTO {
    @IsString()
    movieId!: string;
}

export class GetMovieByIdDTO {
    @IsString()
    movieId!: string;
}

export class GetMoviesDTO {
    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsString()
    director?: string;
  
    @IsOptional()
    @IsString()
    releaseDate?: string;
  
    @IsOptional()
    @IsNumber()
    duration?: number;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    genres?: string[];
}