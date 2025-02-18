const ticketService = require('../service/ticket');
const Ticket = require('../model/ticket');
jest.mock('../service/ticket');
jest.mock('../model/ticket');

describe('Ticket Service Tests', () => {

  const mockTicketData = {
    seatId: '123',
    userId: 'user123',
    status: 'Reserved',
  };
  
  // Now initializing the mockTicket after mockTicketData
  const mockTicket = {
    ...mockTicketData,
    save: jest.fn().mockResolvedValue(mockTicket), // Mock save method
    cancel: jest.fn().mockResolvedValue({ ...mockTicket, status: 'Cancelled' }), // Mock cancel method
  };

  // Test for Booking a Ticket
  test('should successfully book a ticket', async () => {
    // Mocking the Ticket model and methods
    Ticket.findOne.mockResolvedValue(mockTicket); // Assume the ticket is reserved
    ticketService.bookTicket.mockResolvedValue(mockTicket); // Service call for booking ticket

    const result = await ticketService.bookTicket(mockTicketData.seatId, mockTicketData.userId);
    
    expect(result).toEqual(mockTicket);  // Ensure the ticket booking is successful
    expect(Ticket.findOne).toHaveBeenCalledWith({ seatId: '123', status: 'Reserved' }); // Check that ticket was found
    expect(mockTicket.save).toHaveBeenCalled(); // Ensure save was called
  });

  test('should throw error if ticket is already booked', async () => {
    // Mocking the Ticket model to return a booked ticket
    Ticket.findOne.mockResolvedValue(null);  // Ticket not found, should throw error

    await expect(ticketService.bookTicket('123', 'user123')).rejects.toThrow('Ticket is not available or already booked');
  });
  
  // Test for Canceling a Ticket
  test('should successfully cancel a booked ticket', async () => {
    // Mocking the Ticket model to return a booked ticket
    Ticket.findOne.mockResolvedValue(mockTicket); // Find the booked ticket

    const result = await ticketService.cancelTicket('123', 'user123');
    
    expect(result.status).toBe('Cancelled');  // Ensure the ticket status is updated to 'Cancelled'
    expect(mockTicket.cancel).toHaveBeenCalled();  // Ensure the cancel method was called
    expect(Ticket.findOne).toHaveBeenCalledWith({ seatId: '123', status: 'Booked' });  // Ensure the correct ticket was found
  });

  test('should throw error if trying to cancel a non-booked ticket', async () => {
    // Mocking the Ticket model to return null (non-booked ticket)
    Ticket.findOne.mockResolvedValue(null);

    await expect(ticketService.cancelTicket('123', 'user123')).rejects.toThrow('Ticket not found or not booked');
  });

});
