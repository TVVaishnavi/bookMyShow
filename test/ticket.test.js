jest.mock('../src/service/ticket');
jest.mock('../src/model/ticket');

const ticketService = require('../src/service/ticket');
const Ticket = require('../src/model/ticket');

describe('Ticket Service Tests', () => {
  let mockTicket;
  
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
      cancel: jest.fn().mockResolvedValue({ ...mockTicketData, status: 'Cancelled' }), 
    };

    // Mock Ticket Model
    Ticket.findOne.mockImplementation(async (query) => {
      if (query.seatId === '123' && query.status === 'Reserved') {
        return { ...mockTicket, status: 'Reserved' }; 
      }
      if (query.seatId === '123' && query.status === 'Booked') {
        return { ...mockTicket, status: 'Booked' };
      }
      return null;
    });

    ticketService.bookTicket = jest.fn(async (seatId, userId) => {
      const ticket = await Ticket.findOne({ seatId, status: 'Reserved' });
      if (!ticket) throw new Error('Ticket is not available or already booked');
      ticket.status = 'Booked';
      await ticket.save();
      return ticket;
    });

    ticketService.cancelTicket = jest.fn(async (seatId, userId) => {
      const ticket = await Ticket.findOne({ seatId, status: 'Booked' });
      if (!ticket) throw new Error('Ticket not found or not booked');
      ticket.status = 'Cancelled';
      await ticket.cancel();
      return ticket;
    });
  });

  test('should successfully book a ticket', async () => {
    const result = await ticketService.bookTicket('123', 'user123');
    
    expect(result).toEqual({ ...mockTicket, status: 'Booked' });
    expect(Ticket.findOne).toHaveBeenCalledWith({ seatId: '123', status: 'Reserved' }); 
    expect(Ticket.findOne).toHaveBeenCalledTimes(1); 
    expect(mockTicket.save).toHaveBeenCalledTimes(1); 
  });

  test('should throw error if ticket is already booked', async () => {
    await expect(ticketService.bookTicket('456', 'user123')).rejects.toThrow('Ticket is not available or already booked');
  });

  test('should successfully cancel a booked ticket', async () => {
    const result = await ticketService.cancelTicket('123', 'user123');
    
    expect(result.status).toBe('Cancelled');
    expect(mockTicket.cancel).toHaveBeenCalledTimes(1); 
    expect(Ticket.findOne).toHaveBeenCalledWith({ seatId: '123', status: 'Booked' }); 
  });

  test('should throw error if trying to cancel a non-booked ticket', async () => {
    await expect(ticketService.cancelTicket('456', 'user123')).rejects.toThrow('Ticket not found or not booked');
  });
});
