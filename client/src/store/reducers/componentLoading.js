import * as actions from '../actions/authTypes';

const initialState = {
    loading: false
};

export const componentLoading = (state = initialState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case actions.COMP_LOADING_FULFILLED: {
            newState = {
                ...state,
                loading: false
            }
            return newState;
        }
        case actions.COMP_LOADING_PENDING: {
            newState = {
                ...state,
                loading: true
            }
            return newState;
        }
      default:
        return newState;
    }
};