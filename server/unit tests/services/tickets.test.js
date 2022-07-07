const Ticket = require("../../models/ticketSchema");
const ticketService = require("../../services/ticket");

jest.mock("../../models/ticketSchema");

describe("ticket service", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

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

  describe("return ticket failed", () => {
    it("should not update ticket", async () => {
      const hours = new Date().getHours();
      const minutes = new Date().getMinutes();

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(() => "Return time expired"),
      };

      Ticket.findByIdAndUpdate = jest.fn();
      Ticket.findById = jest.fn().mockReturnThis();
      Ticket.populate = jest.fn(() => {
        return {
          flightRecordId: {
            flightDay: new Date(),
            flightId: {
              departureTime: `${hours}:${minutes}`,
            },
          },
        };
      });

      process.env.RETURN_EXPIRATION = 24;

      try {
        await ticketService.updateReturnedTicket("mockId");
      } catch (error) {
        expect(error.message).toEqual("Return time expired");
      }
    });
  });

  describe("return ticket", () => {
    it("should return ticket and update ticket user to be null", async () => {
      const hours = new Date().getHours();
      const minutes = new Date().getMinutes();

      Ticket.findByIdAndUpdate = jest.fn();
      Ticket.findById = jest.fn().mockReturnThis();
      Ticket.populate = jest.fn(() => {
        return {
          flightRecordId: {
            flightDay: new Date("5000-05-05"),
            flightId: {
              departureTime: `${hours}:${minutes}`,
            },
          },
        };
      });

      process.env.RETURN_EXPIRATION = 24;

      await ticketService.updateReturnedTicket("mockId");

      expect(Ticket.findByIdAndUpdate).toHaveBeenCalled();
    });
  });
});
