import * as actions from '../actions/authTypes';

const initialState = {};

export const errorData =  function(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}