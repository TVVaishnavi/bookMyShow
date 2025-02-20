import ticketService from '../src/service/ticket';
import { MOCK_TICKET, MOCK_CANCELLED_TICKET, TICKET_ALREADY_BOOKED_ERROR, TICKET_NOT_FOUND_ERROR } from '../src/constant';

jest.mock('../src/models/ticket'); // Mock the Ticket model
jest.mock('../src/service/ticket', () => ({
  __esModule: true,
  default: {
    bookTicket: jest.fn(),
    cancelTicket: jest.fn(),
  },
}));

describe('Ticket Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('should successfully book a ticket', async () => {
    (ticketService.bookTicket as jest.Mock).mockResolvedValueOnce(MOCK_TICKET);

    const result = await ticketService.bookTicket(
      MOCK_TICKET.userId,
      MOCK_TICKET.theatreId,
      MOCK_TICKET.movieId,
      MOCK_TICKET.showTime,
      MOCK_TICKET.seatIds,
      MOCK_TICKET // Provide any missing data argument here
    );

    expect(result).toEqual(MOCK_TICKET);
    expect(ticketService.bookTicket).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if ticket is already booked', async () => {
    (ticketService.bookTicket as jest.Mock).mockRejectedValueOnce(new Error(TICKET_ALREADY_BOOKED_ERROR));

    await expect(
      ticketService.bookTicket(MOCK_TICKET.userId, MOCK_TICKET.theatreId, MOCK_TICKET.movieId, new Date(), ['456'], {
        userId: '',
        theatreId: '',
        movieId: '',
        seatIds: [],
        showTime: new Date,
      }) 
    ).rejects.toThrow(TICKET_ALREADY_BOOKED_ERROR);
  });

  test('should successfully cancel a booked ticket', async () => {
    (ticketService.cancelTicket as jest.Mock).mockResolvedValueOnce(MOCK_CANCELLED_TICKET);

    const result = await ticketService.cancelTicket(MOCK_CANCELLED_TICKET._id, MOCK_CANCELLED_TICKET.userId, {
      ticketId: '',
      userId: ''
    }); // Provide the missing data argument here

    expect(result.status).toBe('Cancelled');
    expect(ticketService.cancelTicket).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if trying to cancel a non-booked ticket', async () => {
    (ticketService.cancelTicket as jest.Mock).mockRejectedValueOnce(new Error(TICKET_NOT_FOUND_ERROR));

    await expect(ticketService.cancelTicket('456', MOCK_TICKET.userId, {
      ticketId: '',
      userId: ''
    })) // Add the missing data argument here
      .rejects.toThrow(TICKET_NOT_FOUND_ERROR);
  });
});
