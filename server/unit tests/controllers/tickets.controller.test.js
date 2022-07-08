const ticketServices = require("../../services/ticket");
const ticketController = require("../../controllers/ticket");

jest.mock("../../services/ticket");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((x) => x),
};

const req = {
  body: {
    userData: {},
    numberOfTickets: 1,
    flightRecordId: "record id",
    ticketClass: "ticketClass",
  },
  user: {
    _id: "user id",
  },
  params: {
    flightRecordId: "record id",
    ticketId: "ticketId",
  },
  query: {},
};

describe("ticket controller", () => {
  describe("get tickets by user", () => {
    it("should find tickets base user id and return them", async () => {
      ticketServices.findTicketByUser.mockResolvedValue([
        { ticket: "ticket", userId: "user id" },
      ]);

      await ticketController.getTicketsByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { ticket: "ticket", userId: "user id" },
      ]);
    });
  });

  describe("get tickets by record", () => {
    it("should find tickets based on flight record id and return them", async () => {
      ticketServices.findTicketsByRecord.mockResolvedValue({
        tickets: [{ ticket: "ticket", flightRecordId: "record id" }],
        total: "total",
      });

      await ticketController.getTicketsByRecord(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        tickets: [{ ticket: "ticket", flightRecordId: "record id" }],
        total: "total",
      });
    });
  });

  describe("book ticket", () => {
    it("should update tickets to be booked and return them", async () => {
      ticketServices.updateBookedTicket.mockResolvedValue([
        { ticket: "ticket" },
      ]);

      await ticketController.bookTicket(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ ticket: "ticket" }]);
    });
  });

  describe("return ticket", () => {
    it("should update ticket to be returned and return it", async () => {
      ticketServices.updateReturnedTicket.mockResolvedValue({
        ticket: "ticket",
      });

      await ticketController.returnTicket(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ ticket: "ticket" });
    });
  });
});
