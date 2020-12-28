const PREREQUISITE_SEPARATOR_REGEX = / => ?/;

function parseDestinationInput(row) {
  const [destination, prerequisite] = row.split(PREREQUISITE_SEPARATOR_REGEX);
  return { destination, prerequisite };
}

function parseTravelPlanInput(input) {
  return input.split("\n").map(parseDestinationInput);
}

/**
 * Generates a possible travel order based on given constraints
 * @param {string} input List of destinations and prerequisites
 * @returns {string} The generated travel plan
 */
export function generateTravelPlan(input) {
  const rules = parseTravelPlanInput(input);
  const destinations = new Set();
  const prerequisites = {};
  const travelPlan = [];

  for (const { destination, prerequisite } of rules) {
    destinations.add(destination);
    prerequisites[destination] = new Set();

    if (prerequisite !== "") {
      prerequisites[destination].add(prerequisite);
    }
  }

  while (destinations.size > 0) {
    const dependencyFreeDestinations = Array.from(destinations).filter(
      (destination) => prerequisites[destination].size === 0
    );

    if (dependencyFreeDestinations.length === 0) {
      throw new Error("Circular dependency");
    }

    for (const destination of dependencyFreeDestinations) {
      travelPlan.push(destination);
      destinations.delete(destination);

      for (const prerequisites of Object.values(prerequisites)) {
        prerequisites.delete(destination);
      }
    }
  }

  return travelPlan.join("");
}
