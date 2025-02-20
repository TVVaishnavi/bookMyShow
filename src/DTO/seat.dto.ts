import { IsString, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import mongoose from "mongoose";

export class GetAvailableSeatsDTO {
  @IsString()
  @IsNotEmpty({ message: "Theatre ID is required" })
  theatreId!: string;

  @IsString()
  @IsNotEmpty({ message: "Movie ID is required" })
  movieId!: string;

  @IsString()
  @IsNotEmpty({ message: "Show time is required" })
  showTime!: string;
}

export class ReserveSeatDTO {
  @IsString()
  @IsNotEmpty({ message: "Seat ID is required" })
  seatId!: string;

  @Transform(({ value }) => new mongoose.Types.ObjectId(value))
  userId!: mongoose.Types.ObjectId;
}

export class BookSeatDTO {
  @IsString()
  @IsNotEmpty({ message: "Seat ID is required" })
  seatId!: string;

  @Transform(({ value }) => new mongoose.Types.ObjectId(value))
  userId!: mongoose.Types.ObjectId;
}
