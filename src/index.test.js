import { calculateTravelOrder } from "./index.js";

test("Single destination", () => {
  const input = `x =>`;

  expect(calculateTravelOrder(input)).toBe("x");
});
