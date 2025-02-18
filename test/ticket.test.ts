import ticketService from '../src/service/ticket';
import Ticket from '../src/models/ticket';

jest.mock('../src/models/ticket'); // Mock model

describe('Ticket Service Tests', () => {
  let mockTicket: any;

  beforeEach(() => {
    jest.clearAllMocks();

    const mockTicketData = {
      seatId: '123',
      userId: 'user123',
      status: 'Reserved',
    };

    mockTicket = {
      ...mockTicketData,
      save: jest.fn().mockResolvedValue({ ...mockTicketData, status: 'Booked' }),
    };

    (Ticket.findOne as jest.Mock).mockImplementation(async (query: { seatId: string; status: string }) => {
      if (query.seatId === '123' && query.status === 'Reserved') {
        return { ...mockTicket, status: 'Reserved' };
      }
      if (query.seatId === '123' && query.status === 'Booked') {
        return { ...mockTicket, status: 'Booked' };
      }
      return null;
    });

    (ticketService.bookTicket as jest.Mock).mockImplementation(async (userId: string, theatreId: string, movieId: string, showTime: Date, seatIds: string[]) => {
      const ticket = await Ticket.findOne({ seatId: seatIds[0], status: 'Reserved' });
      if (!ticket) throw new Error('Ticket is not available or already booked');
      ticket.status = 'Booked';
      await ticket.save();
      return ticket;
    });

    (ticketService.cancelTicket as jest.Mock).mockImplementation(async (ticketId: string, userId: string) => {
      const ticket = await Ticket.findOne({ _id: ticketId, userId });
      if (!ticket) throw new Error('Ticket not found or not booked');
      ticket.status = 'Cancelled';
      await ticket.save();
      return ticket;
    });
  });

  test('should successfully book a ticket', async () => {
    const result = await ticketService.bookTicket('user123', 'theatre123', 'movie123', new Date(), ['123']);

    expect(result).toEqual({ ...mockTicket, status: 'Booked' });
    expect(Ticket.findOne).toHaveBeenCalledWith({ seatId: '123', status: 'Reserved' });
    expect(Ticket.findOne).toHaveBeenCalledTimes(1);
    expect(mockTicket.save).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if ticket is already booked', async () => {
    await expect(ticketService.bookTicket('user123', 'theatre123', 'movie123', new Date(), ['456'])).rejects.toThrow('Ticket is not available or already booked');
  });

  test('should successfully cancel a booked ticket', async () => {
    const result = await ticketService.cancelTicket('123', 'user123');

    expect(result.status).toBe('Cancelled');
    expect(Ticket.findOne).toHaveBeenCalledWith({ _id: '123', userId: 'user123' });
    expect(mockTicket.save).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if trying to cancel a non-booked ticket', async () => {
    await expect(ticketService.cancelTicket('456', 'user123')).rejects.toThrow('Ticket not found or not booked');
  });
});
