import * as actions from '../actions/authTypes';

const initialState = {
    data : [],
    loading: true,
};

export const oneBlogData = (state = initialState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case actions.FETCH_ONE_BLOG_FULFILLED: {
            newState = {
                ...state,
                data: action.payload.data,
                loading:false
            }
            return newState;
        }
        case actions.FETCH_ONE_BLOG_PENDING: {
            newState = {
                ...state,
                loading: true
            }
            return newState;
        }
        case actions.EDIT_BLOG_FULFILLED: {
            newState = {
                ...state,
                data: action.payload.data,
                loading:false
            }
            return newState;
        }
        case actions.EDIT_BLOG_PENDING: {
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