import * as actions from '../actions/authTypes';

const initialState = {
    data : [],
    loading: true,
    addLoading: false
};

export const allBlogData = (state = initialState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case actions.GET_BLOGS_FULFILLED: {
            newState = {
                ...state,
                data: action.payload.data,
                loading:false
            }
            return newState;
        }
        case actions.GET_BLOGS_PENDING: {
            newState = {
                ...state,
                loading: true
            }
            return newState;
        }
        case actions.ADD_BLOGS_FULFILLED: {
            newState = {
                ...state,
                data: action.payload.data,
                addLoading:false,
                loading: false
            }
            return newState;
        }
        case actions.ADD_BLOGS_PENDING: {
            newState = {
                ...state,
                addLoading: true,
                loading: true
            }
            return newState;
        }
        case actions.DELETE_BLOG_FULFILLED: {
            newState = {
                ...state,
                data: action.payload.data,
                loading: false
            }
            return newState;
        }
        case actions.DELETE_BLOG_PENDING: {
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