const {bookTicket, cancelTicket} = require('../service/ticket')

exports.bookTicket = async(req, res)=>{
    try {
        const {theatreId, movieId, showTime, seatIds} = req.body
        const ticket = await bookTicket(req.user.id, theatreId,movieId, showTime,seatIds)
        res.status(201).json({message: 'Ticket booked successfully'})
    } catch (error) {
        res.ststus(400).json({message: error.message})
    }
}

exports.cancelTicket = async(req, res)=>{
    try {
        const {ticketId} = req.params
        const response = await cancelTicket(ticketId, req.user.id)
        res.status(200).json(response)
    } catch (error) {
        res.ststus(400).json({error: error.message})
    }
}

module.exports = {bookTicket, cancelTicket }