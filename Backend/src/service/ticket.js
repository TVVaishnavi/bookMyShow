const Movie = require("../model/movie")
const ticket = require("../model/ticket")

const bookMovieTicket = async (user, movie, seat,totalPrice) => {
    try {
        const existedMovie = await Movie.find(movie)
        if (!existedMovie) {
            throw new Error("movie is not found")
        } else {
            // const updateSeat = await seat.updateSeat()
            const data={ user: user, movie: existedMovie, seats: seat ,totalPrice:totalPrice}
            const bookticket = new ticket(data)
            bookticket.save()
            return data
        }
    } catch (error) {
        return error
    }
}

const cancelMovieTicket=async(id)=>{
    try {
        const findticket=await ticket.find({_id:id})
        if(!findticket){
            throw new Error("Ticket Not Found")
        }
        else{
           const deleteticket=await ticket.deleteOne({_id:id})
           return {message:"Ticket Canceled Successfully",data:deleteticket}
        }
    } catch (error) {
        return error
    }
}

module.exports={bookMovieTicket,cancelMovieTicket}