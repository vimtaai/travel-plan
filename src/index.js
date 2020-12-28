const PREREQUISITE_SEPARATOR_REGEX = / => ?/;

function parseDestinationInput(destination) {
  const [name, prerequisite] = destination.split(PREREQUISITE_SEPARATOR_REGEX);
  return { name, prerequisite };
}

function parseTravelPlanInput(input) {
  return input.split("\n").map(parseDestinationInput);
}

/**
 * Calculates a possible travel order based on given constraints
 * @param {string} input List of destinations and prerequisites
 */
export function calculateTravelOrder(input) {
  const destinations = parseTravelPlanInput(input);

  return destinations.map((destination) => destination.name).join("");
}
