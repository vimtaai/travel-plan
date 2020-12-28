const PREREQUISITE_SEPARATOR_REGEX = / => ?/;

function parseDestinationInput(row) {
  const [destination, prerequisite] = row.split(PREREQUISITE_SEPARATOR_REGEX);
  return { destination, prerequisite };
}

function parseTravelPlanInput(input) {
  return input.split("\n").map(parseDestinationInput);
}

function getPrerequisitesByDestination(rules) {
  const destinations = {};

  for (const { destination, prerequisite } of rules) {
    destinations[destination] = new Set();

    if (prerequisite !== "") {
      destinations[destination].add(prerequisite);
    }
  }

  return destinations;
}

function getDestinationsWithNoPrerequisites(destinations) {
  return Object.keys(destinations).filter((destination) => destinations[destination].size === 0);
}

/**
 * Generates a possible travel order based on given constraints
 * @param {string} input List of destinations and prerequisites
 * @returns {string} The generated travel plan
 */
export function generateTravelPlan(input) {
  const rules = parseTravelPlanInput(input);
  const destinations = getPrerequisitesByDestination(rules);
  const travelPlan = [];

  while (Object.keys(destinations).length > 0) {
    const destinationsWithNoPrerequisites = getDestinationsWithNoPrerequisites(destinations);

    if (destinationsWithNoPrerequisites.length === 0) {
      throw new Error("Unable to generate travel plan (circular or nonexistent prerequisite)");
    }

    for (const destination of destinationsWithNoPrerequisites) {
      travelPlan.push(destination);
      delete destinations[destination];

      for (const prerequisites of Object.values(destinations)) {
        prerequisites.delete(destination);
      }
    }
  }

  return travelPlan.join("");
}
