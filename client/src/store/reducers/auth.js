import * as actions from '../actions/authTypes';

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export const authData = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case actions.START_LOADING:
            return {
                ...state,
                loading: true
            };
        case actions.STOP_LOADING:
        return {
            ...state,
            loading: false
        };
        default:
        return state;
    }
};