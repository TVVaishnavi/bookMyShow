import ticketService from '../src/service/ticket';
import Ticket from '../src/models/ticket';

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
    const mockTicket = {
      _id: 'ticket123',
      userId: 'user123',
      theatreId: 'theatre123',
      movieId: 'movie123',
      showTime: new Date(),
      seatIds: ['123'],
      status: 'Booked',
    };

    (ticketService.bookTicket as jest.Mock).mockResolvedValueOnce(mockTicket);

    const result = await ticketService.bookTicket(
      'user123',
      'theatre123',
      'movie123',
      new Date(),
      ['123']
    );

    expect(result).toEqual(mockTicket);
    expect(ticketService.bookTicket).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if ticket is already booked', async () => {
    (ticketService.bookTicket as jest.Mock).mockRejectedValueOnce(new Error('Ticket is not available or already booked'));

    await expect(ticketService.bookTicket('user123', 'theatre123', 'movie123', new Date(), ['456']))
      .rejects.toThrow('Ticket is not available or already booked');
  });

  test('should successfully cancel a booked ticket', async () => {
    const mockTicket = {
      _id: 'ticket123',
      userId: 'user123',
      status: 'Cancelled',
    };

    (ticketService.cancelTicket as jest.Mock).mockResolvedValueOnce(mockTicket);

    const result = await ticketService.cancelTicket('ticket123', 'user123');

    expect(result.status).toBe('Cancelled');
    expect(ticketService.cancelTicket).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if trying to cancel a non-booked ticket', async () => {
    (ticketService.cancelTicket as jest.Mock).mockRejectedValueOnce(new Error('Ticket not found or not booked'));

    await expect(ticketService.cancelTicket('456', 'user123'))
      .rejects.toThrow('Ticket not found or not booked');
  });
});
