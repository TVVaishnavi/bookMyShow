import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const API_ROUTES = {
  USER: "/",
  MOVIE: "/api",
  THEATRE: "/api/theatre",
};

export const MONGO_MESSAGES = {
  CONNECTED: "MongoDB connection is open. Starting server...",
  ERROR: "MongoDB connection error:",
};

export const MONGODB = {
    URI: process.env.MONGODB_URI,
    OPTIONS: {
      tls: true,
      serverSelectionTimeoutMS: 5000,
    },
    MESSAGES: {
      MISSING_URI: "Missing MONGODB_URI in environment variables",
      CONNECTED: "Connected to MongoDB",
      ERROR: "MongoDB connection error:",
    },
};

export const secretKey = 'yourSecretKey';
export const tokenExpiration = '1h'; 

export const MOVIE_MESSAGES = {
    CREATED: "Movie created successfully",
    UPDATED: "Movie updated successfully",
    DELETED: "Movie deleted successfully",
    SEARCH_ERROR: "Error searching movies",
};
  
export const MOVIE_QUERY_KEYS = ["title", "genre", "director", "language"];
  
export const SEAT_MESSAGES = {
    RESERVED: "Seat reserved",
    BOOKED: "Seat booked successfully",
    UNAUTHORIZED: "Unauthorized",
};

export const THEATRE_MESSAGES = {
    CREATED: "Theatre created successfully",
    NOT_FOUND: "Theatre not found",
    UPDATED: "Theatre updated successfully",
    DELETED: "Theatre deleted successfully",
    DELETE_ERROR: "Error deleting the theatre",
};

export const TICKET_MESSAGES = {
    BOOKED: "Ticket booked successfully",
    NOT_AUTHENTICATED: "User not authenticated",
};
  
export const USER_MESSAGES = {
    CREATED_SUCCESS: "User created successfully",
    INTERNAL_ERROR: "Internal server error",
    INVALID_CREDENTIALS: "Invalid credentials",
    INVALID_TOKEN: "Invalid token",
};

export const AUTH_MESSAGES = {
    MISSING_TOKEN: "Unauthorized: Missing Token",
    INVALID_FORMAT: "Unauthorized: Invalid token format",
    FORBIDDEN: "Forbidden: Invalid token",
    INVALID_TOKEN: "Invalid token",
};

export const DATE_FORMAT = "yyyyMMdd\tHH:mm:ss";

export const ERROR_MESSAGES = {
  UNEXPECTED_ERROR: "An unexpected error occurred",
};

export const LOG_KEYS = {
  METHOD: "method",
  ORIGIN: "origin",
  PATH: "path",
};

export const ADMIN = {
    EMAIL_ENV: "ADMIN_EMAIL", 
    NAME: "Admin",
    ROLE: "admin",
    DEFAULT_PASSWORD: "admin",
};

export const PASSWORD = {
    SALT_ROUNDS: 10,
};

export const MOVIE_MESSAGESES = {
    CREATE_ERROR: "Error creating movie",
    UPDATE_ERROR: "Error updating movie",
    DELETE_ERROR: "Error deleting movie",
    FETCH_ERROR: "Error fetching movie",
    FETCH_ALL_ERROR: "Error fetching movies",
    NOT_FOUND: "Movie not found",
};
 
export const SEAT_STATUS = {
    AVAILABLE: 'Available',
    RESERVED: 'Reserved',
    BOOKED: 'Booked',
};

export const SEAT = {
    NOT_FOUND: "Seat not found",
    UNAUTHORIZED_BOOKING: "Seat is not reserved or unauthorized booking",
    RELEASE_LOG: "Releasing expired reservations...",
    RELEASE_ERROR: "Error in releasing reservations:",
    RELEASE_SUCCESS: (count: number) => `Released ${count} expired reservations.`,
};

export const RESERVATION_EXPIRATION = 5 * 60 * 1000;

export const THEATRE = {
    NOT_FOUND: "Theatre not found",
    CREATE_ERROR: "Error creating theatre",
    UPDATE_ERROR: "Error updating theatre",
    DELETE_ERROR: "Error deleting theatre",
    SEARCH_ERROR: "Error searching theatres",
};

export const MONGO_OPTIONS = { new: true };
export const SEARCH_FIELDS = ["name", "location"];
  
export enum TICKET {
    BOOKED = "Booked",
    CANCELED = "Cancelled",
    CONFIRMED = "CONFIRMED",
  }
  
  export enum PAYMENT {
    PAID = "Paid",
    REFUND_INITIATED = "Refund Initiated",
    PENDING = "Pending",
    REFUND = "Refund",
    DUE = "DUE", // Add this to match your usage
  }
  
  // Make sure your constants match these enums
  export const ERROR = {
    NOT_ENOUGH: "Not enough seats available",
    NOT_FOUND: "Ticket not found",
    ALREADY_CANCELED: "Ticket already canceled",
  };
  
  export const SUCCESS = {
    CANCELED: "Ticket successfully canceled",
  };
  
  export const PRICE = 100; // Example price
  export const AVAILABILITY = {
    OPEN: "Open",
    TAKEN: "Taken",
  };
  
  
export const SALT_ROUNDS = 10;

export const AUTH = {
    SECRET: "your_secret_key_here", 
};

export const ERRORS = {
    EMAIL_EXISTS: "Email already registered",
    INVALID_CREDENTIALS: "Invalid email or password",
    LOGIN_FAILED: "Login failed",
    USER_NOT_FOUND: "User not found",
    INVALID_TOKEN: "Invalid token",
};

export const ACCESS = {
    ADMIN: "admin",
};
export const SALT = 10;

export const AUTHS = {
    SECRET: "your_secret_key_here", // Store securely in an environment variable
};

export const ISSUE = {
    EMAIL_EXISTS: "Email already registered",
    CREDENTIALS_INCORRECT: "Invalid email or password",
    LOGIN_PROBLEM: "Login failed",
    USER_MISSING: "User not found",
    TOKEN_INVALID: "Invalid token",
};

export const ACCESS_TYPE = {
    ADMIN: "admin",
};

export const HTTP_CODE = {
    SUCCESS: 200,
    CREATED: 201,
    FAILURE: 500,
};

export const MOVIE_RESPONSES = {
    CREATED: "New entry added",
    UPDATED: "Entry modified",
    REMOVED: "Entry erased",
    FETCH_FAIL: "Unable to retrieve information",
    NOT_FOUND: "No details available",
    SEARCH_FAIL: "Could not process request",
};
export const RESPONSE_CODE = {
    SUCCESS: 200,
    FAILURE: 500,
};

export const SEAT_RESPONSES = {
    RESERVED: "Reservation confirmed",
    NOT_FOUND: "No match found",
    PROCESS_FAIL: "Request could not be completed",
};

import mongoose from "mongoose";

export const THEATRE_DATA = {
  name: "Cinema Hall",
  location: "New York",
  seatingCapacity: 200,
  contact: { phone: "1234567890", email: "test@theatre.com" },
  amenities: ["Wifi", "Parking"],
};

export const MOCK_THEATRE = {
  ...THEATRE_DATA,
  _id: new mongoose.Types.ObjectId(), 
  save: jest.fn().mockResolvedValue(THEATRE_DATA),
};

export const MOCK_TICKET = {
    _id: 'ticket123',
    userId: 'user123',
    theatreId: 'theatre123',
    movieId: 'movie123',
    showTime: new Date(),
    seatIds: ['123'],
    status: 'Booked',
};
  
export const MOCK_CANCELLED_TICKET = {
    _id: 'ticket123',
    userId: 'user123',
    status: 'Cancelled',
};
  
export const TICKET_ALREADY_BOOKED_ERROR = 'Ticket is not available or already booked';
export const TICKET_NOT_FOUND_ERROR = 'Ticket not found or not booked';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest'
}
  