import { initializedSuccess } from "./actionCreators";
import { initUser } from "../auth/thunks";

const initializeApp = () => async (dispatch) => {
  try {
    await dispatch(initUser());
    dispatch(initializedSuccess());
  } catch (e) {
    console.log(e);
  }
};

export { initializeApp };
