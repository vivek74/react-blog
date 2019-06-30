import * as actions from '../actions/authTypes';

const initialState = {
    error: {},
    data : {},
    loading: false,
    errMsg: false,
    successMsg: false
};

export const registerData = (state = initialState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case actions.REGISTER_USER_FULFILLED: {
            let status = action.payload.status;
            if(status === 200){
                newState = {
                    ...state,
                    error: action.payload.data,
                    loading:false,
                    errMsg:true
                }
            } else if(status === 201) {
                newState = {
                    ...state,
                    data: action.payload.data,
                    loading: false,
                    successMsg: true 
                }
            }
            return newState;
        }
        case actions.REGISTER_USER_PENDING: {
            newState = {
                ...state,
                loading: true
            }
            return newState;
        }
        case actions.MSG_STATE_ERROR: {
            newState = {
                ...state,
                errMsg: false
            }
            return newState;
        }
        case actions.MSG_STATE_SUCCESS: {
            newState = {
                ...state,
                successMsg: false
            }
            return newState;
        }
      default:
        return newState;
    }
};