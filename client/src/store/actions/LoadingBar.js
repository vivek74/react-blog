import axios from 'axios';
export const SET_LOADING = 'SET_LOADING';
export const SET_LOADING_PENDING = 'SET_LOADING_PENDING';
export const SET_LOADING_FULFILLED = 'SET_LOADING_FULFILLED';
export const SET_LOADING_REJECTED = 'SET_LOADING_REJECTED';

export const checkLoading = () => {
    return {
        type: 'SET_LOADING',
        payload: axios.get('http://localhost:5000/api/users/get-users')
    };
};
