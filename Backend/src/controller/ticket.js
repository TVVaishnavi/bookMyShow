const { bookMovieTicket, cancelMovieTicket } = require('../service/ticket');

const bookTicket = async (req, res) => {
    try {
        const { user, movieTitle, theatreName, showTime, seatNumbers, totalPrice } = req.body;

        const ticket = await bookMovieTicket(user, movieTitle, theatreName, showTime, seatNumbers, totalPrice);

        if (ticket.error) {
            return res.status(400).json({ message: ticket.error });
        }

        return res.status(201).json({ message: 'Ticket booked successfully', data: ticket });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const cancelTicket = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await cancelMovieTicket(id);

        if (response.error) {
            return res.status(404).json({ error: response.error });
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { bookTicket, cancelTicket };
