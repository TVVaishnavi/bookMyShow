import seatService from "../src/service/seat";

const startSeatReleaseJob = (): void => {
    setInterval(async (): Promise<void> => {
        try {
            await seatService.releaseExpiredReservation();
            console.log('Expired reservation released');
        } catch (error: unknown) {
            console.error('Error releasing expired reservations:', error);
        }
    }, 30 * 1000);
}

export default startSeatReleaseJob;