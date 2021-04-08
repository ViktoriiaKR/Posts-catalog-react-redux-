import * as type from './types.js';
import axios from 'axios';

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

export const fetchData = () => {
    return (dispatch) => {
        return axios.get(apiUrl)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: type.ADD_FETCHED_DATA,
                    payload: data
                })
            })
            .catch(error => {
                throw (error);
            });
    };
};

export const fetchDataDetails = ( id ) => {
  return (dispatch) => {
      return axios.get(`${apiUrl}/${id}/comments`)
          .then(response => {
              return response.data
          })
          .then(data => {
              dispatch({
                  type: type.ADD_FETCHED_DATA_DETAILS,
                  payload: data
              })
          })
          .catch(error => {
              throw (error);
          });
  };
};

export const filterByValue = payload => ({
    type: type.FILTER_BY_VALUE,
    payload
});
  
export const sortByUser = payload => ({
    type: type.SORT_POSTS_BY_USER,
    payload
});

export const addNewPost = payload => {
    return {
      type: type.NEW_POST,
      payload
    }
};

export const updateExistPost = payload => {
    return {
      type: type.UPDATE_POST,
      payload
    }
};

export const removePost = payload => ({
    type: type.REMOVE_POST,
    payload
});