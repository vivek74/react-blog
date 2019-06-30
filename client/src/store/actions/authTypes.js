import axios from "axios";
import {setAuthToken} from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//setting user
export const SETTING_USER = 'SETTING_USER';
export const SETTING_USER_PENDING = 'SETTING_USER_PENDING';
export const SETTING_USER_FULFILLED = 'SETTING_USER_FULFILLED';

//set current user
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_CURRENT_PENDING = 'SET_CURRENT_PENDING';
export const SET_CURRENT_FULFILLED = 'SET_CURRENT_FULFILLED';

//error handling
export const GET_ERROR = 'GET_ERROR';
export const GET_ERROR_PENDING = 'GET_ERROR_PENDING';
export const GET_ERROR_FULFILLED = 'GET_ERROR_FULFILLED';
export const GET_ERROR_REJECTED = 'GET_ERROR_REJECTED';

//register user
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_PENDING = 'REGISTER_USER_PENDING';
export const REGISTER_USER_FULFILLED = 'REGISTER_USER_FULFILLED';

//message state
export const MSG_STATE_ERROR = 'MSG_STATE_ERROR';
export const MSG_STATE_SUCCESS = 'MSG_STATE_SUCCESS';

//component Loading
export const COMP_LOADING_PENDING = 'COMP_LOADING_PENDING';
export const COMP_LOADING_FULFILLED = 'COMP_LOADING_FULFILLED';

//fetching blogs
export const GET_BLOGS = 'GET_BLOGS';
export const GET_BLOGS_PENDING = 'GET_BLOGS_PENDING';
export const GET_BLOGS_FULFILLED = 'GET_BLOGS_FULFILLED';

//add blogs
export const ADD_BLOGS = 'ADD_BLOGS';
export const ADD_BLOGS_PENDING = 'ADD_BLOGS_PENDING';
export const ADD_BLOGS_FULFILLED = 'ADD_BLOGS_FULFILLED';

//delete blog
export const DELETE_BLOG = 'DELETE_BLOG';
export const DELETE_BLOG_PENDING = 'DELETE_BLOG_PENDING';
export const DELETE_BLOG_FULFILLED = 'DELETE_BLOG_FULFILLED';

//fetch one blog
export const FETCH_ONE_BLOG = 'FETCH_ONE_BLOG';
export const FETCH_ONE_BLOG_PENDING = 'FETCH_ONE_BLOG_PENDING';
export const FETCH_ONE_BLOG_FULFILLED = 'FETCH_ONE_BLOG_FULFILLED';

//edit Blogs
export const EDIT_BLOG = 'EDIT_BLOG';
export const EDIT_BLOG_PENDING = 'EDIT_BLOG_PENDING';
export const EDIT_BLOG_FULFILLED = 'EDIT_BLOG_FULFILLED';

//get error
export const GET_ERRORS = 'GET_ERRORS';

//loging
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';

// Register User
export const registerUser = (data) => {
    return {
      type: REGISTER_USER,
      payload: axios.post('http://localhost:5000/api/users/register',data)
    }
};

// fetching blogs
export const fetchBlogs = () => {
  return {
    type:GET_BLOGS,
    payload: axios.get('http://localhost:5000/api/blog/blogs')
  }
}

// adding blogs
export const addBlogs = (data) => {
  return {
    type:ADD_BLOGS,
    payload: axios.post('http://localhost:5000/api/blog/newBlog',data)
  }
}

// delete blogs
export const deleteBlog = (id) => {
  return {
    type:DELETE_BLOG,
    payload: axios.delete(`http://localhost:5000/api/blog/blogs/${id}`)
  }
}

export const fetchOneBlog = (id) => {
  return {
    type:FETCH_ONE_BLOG,
    payload: axios.get(`http://localhost:5000/api/blog/${id}`)
  }
}

export const editBlog = (data, id) => {
  return {
    type:EDIT_BLOG,
    payload: axios.put(`http://localhost:5000/api/blog/blogs/${id}`,data)
  }
}

//login route
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:5000/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};