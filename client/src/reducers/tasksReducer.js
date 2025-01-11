export const initialState = {
  tasks: [],
  dailyScore: 0,
  dueDate: new Date(),
}
export const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload }
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] }
    case "REMOVE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      }
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      }
    case "SET_DAILY_SCORE":
      return { ...state, dailyScore: action.payload }
    case "SET_DUE_DATE":
      return { ...state, dueDate: action.payload }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
