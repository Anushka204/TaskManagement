export const ACTIONS = {
  SET_CYCLES: "SET_CYCLES",
  ADD_CYCLE: "ADD_CYCLE",
  UPDATE_CYCLE: "UPDATE_CYCLE",
  DELETE_CYCLE: "DELETE_CYCLE",
  SET_CURRENT_CYCLE: "SET_CURRENT_CYCLE",
  SET_LOADING: "SET_LOADING",
}

export const cycleReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CYCLES:
      return {
        ...state,
        cycles: action.payload,
        currentCycle: action.payload[0] || null,
        loading: false,
      }
    case ACTIONS.ADD_CYCLE:
      if (state.cycles.length === 0) {
        return {
         ...state,
          cycles: [action.payload],
          currentCycle: action.payload,
        }
      }
      return {
        ...state,
        cycles: [...state.cycles, action.payload],
      }
    case ACTIONS.UPDATE_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) =>
          cycle._id === action.payload._id ? action.payload : cycle
        ),
        currentCycle:
          state.currentCycle && state.currentCycle._id === action.payload._id
            ? action.payload
            : state.currentCycle,
      }
    case ACTIONS.DELETE_CYCLE:
      return {
        ...state,
        cycles: state.cycles.filter((cycle) => cycle._id !== action.payload),
        currentCycle:
          state.currentCycle && state.currentCycle._id === action.payload
            ? null
            : state.currentCycle,
      }
    case ACTIONS.SET_CURRENT_CYCLE:
      return {
        ...state,
        currentCycle: action.payload,
      }
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}

export const initialState = {
  cycles: [],
  currentCycle: null,
  loading: false,
}
