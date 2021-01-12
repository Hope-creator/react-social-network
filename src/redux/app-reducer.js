import { getAuth } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';



let initialState = {
    initialized: false,
    id: null,
    login: null,
    email: null,
    isAuth: false,
    authErrorMessage: null
}

const appReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default: return state;
    }
}



export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => async (dispatch) => {
    await dispatch(getAuth());
    dispatch(initializedSuccess())
}


export default appReducer;