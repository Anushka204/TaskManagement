const goalBlueprint = (goal) => {
  return {
    _id: goal._id,
    title: goal.title,
    description: goal.description,
    status: goal.status,
    cycleId: goal.cycleId,
    createdAt: goal.createdAt,
  }
}

export default goalBlueprint
