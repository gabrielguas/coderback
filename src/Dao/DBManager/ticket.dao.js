import TicketModel from "../../models/ticket.model.js";

class TicketDao {
  // Crear un ticket
  async createTicket(ticketData) {
    try {
      return await TicketModel.create(ticketData);
    } catch (error) {
      throw error;
    }
  }
}

export default TicketDao;
