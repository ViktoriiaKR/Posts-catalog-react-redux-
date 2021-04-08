import { ADD_FETCHED_DATA_DETAILS } from '../actions/types';

export default function postDetailsReducer(state = [], action) {
    switch (action.type) {
        case ADD_FETCHED_DATA_DETAILS:
            return [ ...action.payload];
        default:
            return state;
    }
}