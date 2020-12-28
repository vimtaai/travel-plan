import { calculateTravelOrder } from "./index.js";

function checkDestinations(travelOrder, destinations) {
  return destinations.every((destination) => travelOrder.includes(destination));
}

test("Single destination", () => {
  const input = `x =>`;

  expect(calculateTravelOrder(input)).toBe("x");
});

test("Multiple destinations, no prerequisites", () => {
  const input = `x =>\ny =>\nz =>`;
  const travelOrder = calculateTravelOrder(input);
  const allDestinationsExist = checkDestinations(travelOrder, ["x", "y", "z"]);

  expect(allDestinationsExist).toBe(true);
});
