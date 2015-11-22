export default function createReducer(initialState, handlers) {
  return (state = initialState, action = null) => {
    const handler = handlers[action.type];

    if (!handler) {
      return state;
    }

    return handler(state, action);
  };
}
