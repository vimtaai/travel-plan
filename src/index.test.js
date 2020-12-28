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

  expect(getDestinationCount(travelPlan, "x")).toBe(1);
  expect(getDestinationCount(travelPlan, "y")).toBe(1);
  expect(getDestinationCount(travelPlan, "z")).toBe(1);
});

test("Multiple destinations with one prerequisite (prerequsite before destination)", () => {
  const input = ["x =>", "y => z", "z =>"].join("\n");
  const travelPlan = generateTravelPlan(input);

  expect(getDestinationCount(travelPlan, "x")).toBe(1);
  expect(getDestinationCount(travelPlan, "y")).toBe(1);
  expect(getDestinationCount(travelPlan, "z")).toBe(1);

  expect(isPrerequisiteOK(travelPlan, "y", "z")).toBe(true);
});

test("Multiple destinations with one prerequisite (destination before prerequisite)", () => {
  const input = ["x =>", "z =>", "y => z"].join("\n");
  const travelPlan = generateTravelPlan(input);

  expect(getDestinationCount(travelPlan, "x")).toBe(1);
  expect(getDestinationCount(travelPlan, "y")).toBe(1);
  expect(getDestinationCount(travelPlan, "z")).toBe(1);

  expect(isPrerequisiteOK(travelPlan, "y", "z")).toBe(true);
});

test("Multiple destinations with multiple prerequisites", () => {
  const input = ["u =>", "v => w", "w => z", "x => u", "y => v", "z =>"].join("\n");
  const travelPlan = generateTravelPlan(input);

  expect(getDestinationCount(travelPlan, "x")).toBe(1);
  expect(getDestinationCount(travelPlan, "y")).toBe(1);
  expect(getDestinationCount(travelPlan, "z")).toBe(1);
  expect(getDestinationCount(travelPlan, "u")).toBe(1);
  expect(getDestinationCount(travelPlan, "v")).toBe(1);
  expect(getDestinationCount(travelPlan, "w")).toBe(1);

  expect(isPrerequisiteOK(travelPlan, "v", "w")).toBe(true);
  expect(isPrerequisiteOK(travelPlan, "w", "z")).toBe(true);
  expect(isPrerequisiteOK(travelPlan, "x", "u")).toBe(true);
  expect(isPrerequisiteOK(travelPlan, "y", "v")).toBe(true);
});

test("Repeated dependency", () => {
  const input = ["x =>", "y => x", "z => x", "u => y", "v => x", "w => y"].join("\n");
  const travelPlan = generateTravelPlan(input);

  expect(getDestinationCount(travelPlan, "x")).toBe(1);
  expect(getDestinationCount(travelPlan, "y")).toBe(1);
  expect(getDestinationCount(travelPlan, "z")).toBe(1);
  expect(getDestinationCount(travelPlan, "u")).toBe(1);
  expect(getDestinationCount(travelPlan, "v")).toBe(1);
  expect(getDestinationCount(travelPlan, "w")).toBe(1);

  expect(isPrerequisiteOK(travelPlan, "y", "x")).toBe(true);
  expect(isPrerequisiteOK(travelPlan, "z", "y")).toBe(true);
  expect(isPrerequisiteOK(travelPlan, "u", "y")).toBe(true);
  expect(isPrerequisiteOK(travelPlan, "v", "x")).toBe(true);
  expect(isPrerequisiteOK(travelPlan, "w", "y")).toBe(true);
});

test("Multiple dependencies for single destination", () => {
  const input = ["x =>", "y => z", "u => z", "y => u", "z =>"].join("\n");
  const travelPlan = generateTravelPlan(input);

  expect(getDestinationCount(travelPlan, "x")).toBe(1);
  expect(getDestinationCount(travelPlan, "y")).toBe(1);
  expect(getDestinationCount(travelPlan, "z")).toBe(1);
  expect(getDestinationCount(travelPlan, "u")).toBe(1);

  expect(isPrerequisiteOK(travelPlan, "y", "z")).toBe(true);
  expect(isPrerequisiteOK(travelPlan, "u", "z")).toBe(true);
  expect(isPrerequisiteOK(travelPlan, "y", "u")).toBe(true);
});

test("Dependency without corresponding destination", () => {
  const input = ["x =>", "y => z"].join("\n");
  expect(() => generateTravelPlan(input)).toThrow();
});

test("Circular dependency", () => {
  const input = ["x =>", "u => v", "v => w", "w => u"].join("\n");
  expect(() => generateTravelPlan(input)).toThrow();
});
