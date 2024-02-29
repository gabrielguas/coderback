import TicketDao from "../Dao/DBManager/ticket.dao.js";

const ticketDao = new TicketDao();

async function createTicket(ticketData) {
  try {
    const { code, amount, purchaser, purchase_datetime } = ticketData;
    const createdTicket = await ticketDao.createTicket({
      code,
      amount,
      purchaser,
      purchase_datetime,
    });

    return createdTicket;
  } catch (error) {
    console.error("Error al crear el ticket:", error);
    throw new Error("Ocurrió un error al crear el ticket");
  }
}

export default { createTicket };
