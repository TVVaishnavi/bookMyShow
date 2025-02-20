import { IsMongoId, IsNotEmpty, IsArray, IsDate } from "class-validator";

export class BookTicketDTO {
  @IsMongoId()
  @IsNotEmpty()
  userId!: string;

  @IsMongoId()
  @IsNotEmpty()
  theatreId!: string;

  @IsMongoId()
  @IsNotEmpty()
  movieId!: string;

  @IsDate()
  @IsNotEmpty()
  showTime!: Date;

  @IsArray()
  @IsMongoId({ each: true }) 
  @IsNotEmpty()
  seatIds!: string[];
}

export class CancelTicketDTO {
  @IsMongoId()
  @IsNotEmpty()
  ticketId!: string;

  @IsMongoId()
  @IsNotEmpty()
  userId!: string;
}

