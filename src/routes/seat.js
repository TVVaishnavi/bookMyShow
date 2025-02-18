const express = require('express')
const router = express.Router()
const seatController = require('../controller/seats')
const authMiddleware = require('../middleware/authentication')

router.get('/available', seatController.getAvailableSeats)
router.post('/reserve', authMiddleware, seatController.reserveSeat)
router.post('/book', authMiddleware, seatController.bookSeat)

module.exports = router;
