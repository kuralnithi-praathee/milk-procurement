import authActions from "./actions";

const initialState = {
    userTokenDetails: null  
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActions.SET_USER_TOKEN_DETAILS:
            return {
                ...state,
                userTokenDetails: action.payload
            }
        default:
            return state;
    };
};

export default authReducer;