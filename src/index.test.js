import { generateTravelPlan } from "./index";

function getDestinationCount(travelPlan, destination) {
  return Array.from(travelPlan).filter((char) => char === destination).length;
}

function isPrerequisiteOK(travelPlan, destination, prerequisite) {
  const destinationIndex = travelPlan.indexOf(destination);
  const prerequisiteIndex = travelPlan.indexOf(prerequisite);

  return prerequisiteIndex < destinationIndex;
}

test("Single destination", () => {
  const input = "x =>";

  expect(generateTravelPlan(input)).toBe("x");
});

test("Multiple destinations, no prerequisites", () => {
  const input = ["x =>", "y =>", "z =>"].join("\n");
  const travelPlan = generateTravelPlan(input);

  const destinations = ["x", "y", "z"];
  for (const destination of destinations) {
    expect(getDestinationCount(travelPlan, destination)).toBe(1);
  }
});

test("Multiple destinations with one prerequisite (prerequsite before destination)", () => {
  const input = ["x =>", "y => z", "z =>"].join("\n");
  const travelPlan = generateTravelPlan(input);

  const destinations = ["x", "y", "z"];
  for (const destination of destinations) {
    expect(getDestinationCount(travelPlan, destination)).toBe(1);
  }

  expect(isPrerequisiteOK(travelPlan, "y", "z")).toBe(true);
});

test("Multiple destinations with one prerequisite (destination before prerequisite)", () => {
  const input = ["x =>", "z =>", "y => z"].join("\n");
  const travelPlan = generateTravelPlan(input);

  const destinations = ["x", "y", "z"];
  for (const destination of destinations) {
    expect(getDestinationCount(travelPlan, destination)).toBe(1);
  }

  expect(isPrerequisiteOK(travelPlan, "y", "z")).toBe(true);
});

test("Multiple destinations with multiple prerequisites", () => {
  const input = ["u =>", "v => w", "w => z", "x => u", "y => v", "z =>"].join("\n");
  const travelPlan = generateTravelPlan(input);

  const destinations = ["u", "v", "w", "x", "y", "z"];
  for (const destination of destinations) {
    expect(getDestinationCount(travelPlan, destination)).toBe(1);
  }

  const prerequisites = [
    ["v", "w"],
    ["w", "z"],
    ["x", "u"],
    ["y", "v"],
  ];
  for (const [destination, prerequisite] of prerequisites) {
    expect(isPrerequisiteOK(travelPlan, destination, prerequisite)).toBe(true);
  }
});
