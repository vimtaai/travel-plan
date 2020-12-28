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
  const input = `x =>`;

  expect(generateTravelPlan(input)).toBe("x");
});

test("Multiple destinations, no prerequisites", () => {
  const input = `x =>\ny =>\nz =>`;
  const travelPlan = generateTravelPlan(input);

  const destinations = ["x", "y", "z"];
  for (const destination of destinations) {
    expect(getDestinationCount(travelPlan, destination)).toBe(1);
  }
});

test("Multiple destinations with one prerequisite (prerequsite before destination)", () => {
  const input = `x =>\ny => z\nz =>`;
  const travelPlan = generateTravelPlan(input);

  const destinations = ["x", "y", "z"];
  for (const destination of destinations) {
    expect(getDestinationCount(travelPlan, destination)).toBe(1);
  }

  expect(isPrerequisiteOK(travelPlan, "y", "z")).toBe(true);
});

test("Multiple destinations with one prerequisite (destination before prerequisite)", () => {
  const input = `x =>\nz =>\ny => z`;
  const travelPlan = generateTravelPlan(input);

  const destinations = ["x", "y", "z"];
  for (const destination of destinations) {
    expect(getDestinationCount(travelPlan, destination)).toBe(1);
  }

  expect(isPrerequisiteOK(travelPlan, "y", "z")).toBe(true);
});
