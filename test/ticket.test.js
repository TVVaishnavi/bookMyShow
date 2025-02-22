const ticketService = require('../service/ticket')
const Ticket = require('../model/ticket')
jest.mock('../service/ticket')
jest.mock('../model/ticket')

describe('Ticket Service Tests', () => {

  const mockTicketData = {
    seatId: '123',
    userId: 'user123',
    status: 'Reserved',
  }

  const mockTicket = {
    ...mockTicketData,
    save: jest.fn().mockResolvedValue(mockTicket), 
    cancel: jest.fn().mockResolvedValue({ ...mockTicket, status: 'Cancelled' }), 
  }

  test('should successfully book a ticket', async () => {
    Ticket.findOne.mockResolvedValue(mockTicket) 
    ticketService.bookTicket.mockResolvedValue(mockTicket) 

    const result = await ticketService.bookTicket(mockTicketData.seatId, mockTicketData.userId)
    
    expect(result).toEqual(mockTicket)  
    expect(Ticket.findOne).toHaveBeenCalledWith({ seatId: '123', status: 'Reserved' }) 
    expect(mockTicket.save).toHaveBeenCalled() 
  })

  test('should throw error if ticket is already booked', async () => {
    Ticket.findOne.mockResolvedValue(null)  

    await expect(ticketService.bookTicket('123', 'user123')).rejects.toThrow('Ticket is not available or already booked')
  })
  
  test('should successfully cancel a booked ticket', async () => {
    Ticket.findOne.mockResolvedValue(mockTicket) 

    const result = await ticketService.cancelTicket('123', 'user123')
    
    expect(result.status).toBe('Cancelled')  
    expect(mockTicket.cancel).toHaveBeenCalled()  
    expect(Ticket.findOne).toHaveBeenCalledWith({ seatId: '123', status: 'Booked' })  
  })

  test('should throw error if trying to cancel a non-booked ticket', async () => {
    Ticket.findOne.mockResolvedValue(null)

    await expect(ticketService.cancelTicket('123', 'user123')).rejects.toThrow('Ticket not found or not booked')
  })

})
