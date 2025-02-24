const {bookMovieTicket,cancelMovieTicket} = require('../service/ticket')

const bookTicket = async(req, res)=>{
    try {
        const {user,movie,seat,totalPrise} = req.body
        const ticket = await bookMovieTicket(user,movie,seat,totalPrise)
        res.status(201).json({message: 'Ticket booked successfully',data:ticket})
    } catch (error) {
        res.ststus(400).json({message: error.message})
    }
}

const cancelTicket = async(req, res)=>{
    try {
        const {ticketId} = req.params
        const response = await cancelMovieTicket(ticketId)
        res.status(200).json(response)
    } catch (error) {
        res.ststus(400).json({error: error.message})
    }
}

module.exports = {bookTicket, cancelTicket }