import { insertCharAt } from "./utils";

const PREREQUISITE_SEPARATOR_REGEX = / => ?/;

function parseDestinationInput(row) {
  const [destination, prerequisite] = row.split(PREREQUISITE_SEPARATOR_REGEX);
  return { destination, prerequisite };
}

function parseTravelPlanInput(input) {
  return input.split("\n").map(parseDestinationInput);
}

function addPrerequisite(travelPlan, destination, prerequisite) {
  const destinationIndex = travelPlan.indexOf(destination);
  const prerequisiteIndex = travelPlan.indexOf(prerequisite);

  if (prerequisiteIndex === -1) {
    return insertCharAt(travelPlan, prerequisite, destinationIndex);
  }

  if (prerequisiteIndex > destinationIndex) {
    throw new Error("Circular dependency in travel plan");
  }

  return travelPlan;
}

function addDestination(travelPlan, destination, prerequisite) {
  let newTravelPlan = travelPlan;

  if (!newTravelPlan.includes(destination)) {
    newTravelPlan += destination;
  }

  if (prerequisite === undefined) {
    return newTravelPlan;
  }

  return addPrerequisite(newTravelPlan, destination, prerequisite);
}

/**
 * Generates a possible travel order based on given constraints
 * @param {string} input List of destinations and prerequisites
 * @returns {string} The generated travel plan
 */
export function generateTravelPlan(input) {
  const destinations = parseTravelPlanInput(input);
  let travelPlan = "";

  for (const { destination, prerequisite } of destinations) {
    travelPlan = addDestination(travelPlan, destination, prerequisite);
  }

  return travelPlan;
}
