const Movie = require("../model/movie");
const Ticket = require("../model/ticket");
const mongoose = require("mongoose");

const bookMovieTicket = async (user, movieTitle, theatreName, showTime, seatNumbers, totalPrice) => {
    const session = await mongoose.startSession(); 
    session.startTransaction();

    try {
        const existedMovie = await Movie.findOne({ title: movieTitle }).session(session);

        if (!existedMovie) {
            throw new Error("Movie not found");
        }

        const unavailableSeats = seatNumbers.filter(seat => !existedMovie.availableSeat.includes(seat));
        if (unavailableSeats.length > 0) {
            throw new Error(`Seats ${unavailableSeats.join(", ")} are already booked`);
        }

        await Movie.findOneAndUpdate(
            { title: movieTitle },
            {
                $pull: { availableSeat: { $in: seatNumbers } }, 
                $push: { bookedSeat: { $each: seatNumbers } }  
            },
            { new: true, session } 
        );


        const ticketData = {
            user,
            movieTitle,
            theatreName,
            showTime,
            seatNumbers,
            totalPrice
        };

        const bookTicket = new Ticket(ticketData);
        await bookTicket.save({ session }); 

        await session.commitTransaction(); 
        session.endSession(); 

        return { message: "Ticket booked successfully", data: bookTicket };
    } catch (error) {
        await session.abortTransaction(); 
        session.endSession();
        return { error: error.message };
    }
};



const cancelMovieTicket = async (id) => {
    try {
        const findTicket = await Ticket.findOne({ _id: id });

        if (!findTicket) {
            throw new Error("Ticket Not Found");
        }

        await Movie.findOneAndUpdate(
            { title: findTicket.movieTitle },
            {
                $pull: { bookedSeat: { $in: findTicket.seatNumbers } }, 
                $push: { availableSeat: { $each: findTicket.seatNumbers } } 
            },
            { new: true }
        );

        await Ticket.deleteOne({ _id: id });

        return { message: "Ticket Canceled Successfully", data: findTicket };
    } catch (error) {
        return { error: error.message };
    }
};
module.exports = { bookMovieTicket, cancelMovieTicket };
