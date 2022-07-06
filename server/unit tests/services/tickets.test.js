const Ticket = require("../../models/ticketSchema");
const ticketService = require("../../services/ticket");

jest.mock("../../models/ticketSchema");

describe("ticket service", () => {
  describe("book ticket", () => {
    it("should update tickets to book and return them", async () => {
      Ticket.findOneAndUpdate.mockResolvedValue({
        ticketClass: "business",
        price: "100",
        userId: "user",
      });
      const bookedTickets = await ticketService.updateBookedTicket(
        "user",
        "",
        1,
        "",
        "business"
      );

      expect(bookedTickets).toContainEqual({
        ticketClass: "business",
        price: "100",
        userId: "user",
      });
    });
  });
});
