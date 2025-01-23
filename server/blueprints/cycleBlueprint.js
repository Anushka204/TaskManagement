import goalBlueprint from "./goalBlueprint.js"

const cycleBlueprint = (cycle) => {
  return {
    _id: cycle._id,
    title: cycle.title,
    description: cycle.description,
    startDate: cycle.startDate,
    endDate: cycle.endDate,
    goals: cycle.goals.map((goal) => goalBlueprint(goal)),
    createdAt: cycle.createdAt,
  }
}

export default cycleBlueprint
