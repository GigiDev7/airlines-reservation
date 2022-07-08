const generateSeats = require("../../utils/seats");

describe("generate default seats", () => {
  it("should create new seats with names", () => {
    const nums = [1, 2];
    const chars = ["A", "B"];
    const mockSeats = [
      {
        seatNumber: "1A",
        available: true,
      },
      {
        seatNumber: "2B",
        available: true,
      },
      {
        seatNumber: "1B",
        available: true,
      },
      {
        seatNumber: "2A",
        available: true,
      },
    ];

    const result = generateSeats(nums, chars);

    expect(result).toEqual(expect.arrayContaining(mockSeats));
  });
});
