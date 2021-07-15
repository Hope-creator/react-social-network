const selectAppState = (state) => state.app;

const selectIsInitialized = (state) => selectAppState(state).initialized;

export { selectAppState, selectIsInitialized };
