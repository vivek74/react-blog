import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { authData } from './auth';
import { errorData } from './errorReducer';
import { registerData } from './register';
import { componentLoading } from './componentLoading';
import { allBlogData } from './fetchBlogs';
import {oneBlogData} from './fetchOneBlog'

//combine reducers
export default (history) => combineReducers({
    authData: authData,
    error: errorData,
    registerData: registerData,
    componentLoading: componentLoading,
    allBlogs: allBlogData,
    oneBlogData:oneBlogData,
    router: connectRouter(history),
});
