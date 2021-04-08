import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import postDetailsReducer from './postDetails';

export default combineReducers({
    postsReducer,
    postDetails: postDetailsReducer
});