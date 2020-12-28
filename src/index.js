import { insertCharAt } from "./utils";

const PREREQUISITE_SEPARATOR_REGEX = / => ?/;

function parseDestinationInput(destination) {
  const [name, prerequisite] = destination.split(PREREQUISITE_SEPARATOR_REGEX);
  return { name, prerequisite };
}

function parseTravelPlanInput(input) {
  return input.split("\n").map(parseDestinationInput);
}

function addDestination(travelPlan, destination, prerequisite) {
  let newTravelPlan = travelPlan;

  if (!newTravelPlan.includes(destination)) {
    newTravelPlan += destination;
  }

  if (prerequisite !== undefined && !newTravelPlan.includes(prerequisite)) {
    const destinationIndex = newTravelPlan.indexOf(destination);
    newTravelPlan = insertCharAt(newTravelPlan, prerequisite, destinationIndex);
  }

  return newTravelPlan;
}

/**
 * Generates a possible travel order based on given constraints
 * @param {string} input List of destinations and prerequisites
 * @returns {string} The generated travel plan
 */
export function generateTravelPlan(input) {
  const destinations = parseTravelPlanInput(input);
  let travelPlan = "";

  for (const { name: destination, prerequisite } of destinations) {
    travelPlan = addDestination(travelPlan, destination, prerequisite);
  }

  return travelPlan;
}
