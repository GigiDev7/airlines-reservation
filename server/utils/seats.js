const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const generateSeats = (nums, chars) => {
  const result = [];
  for (let num of nums) {
    for (let char of chars) {
      /* if (num <= 3) seatClass = "business";
      if (num > 3 && num <= 6) seatClass = "standart";
      if (num > 6) seatClass = "econom"; */
      const obj = { seatNumber: `${num}${char}`, available: true };
      result.push(obj);
    }
  }
  return result;
};

exports.resultSeats = generateSeats(numbers, characters);

module.exports = generateSeats;
