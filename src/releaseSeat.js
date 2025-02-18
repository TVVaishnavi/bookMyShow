const seatService = require("../src/service/seat")

const startSeatReleaseJob = ()=>{
    setInterval(async()=>{
        try {
            await seatService.releaseExpiredReservation()
            console.log('Expired reservation released')
        } catch (error) {
            console.error('Error releasing expired reservations:', error)
        }
    }, 30*1000)
}
module.exports = startSeatReleaseJob