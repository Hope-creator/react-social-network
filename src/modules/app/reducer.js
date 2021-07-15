import * as actions from "./actions";
import produce from "immer";

const initialState = {
  initialized: false,
};

const reduder = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.INITIALIZED_SUCCESS: {
        draft.initialized = true;
        break;
      }

      default:
        break;
    }
  });

export default reduder;
