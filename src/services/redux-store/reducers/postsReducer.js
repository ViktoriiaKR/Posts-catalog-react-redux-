import * as type from '../actions/types';

const initialState = {
    usedFilters: []
};

const postsReducer = (state = initialState, action) => {
   switch (action.type) {
       case type.ADD_FETCHED_DATA:

        let posts = action.payload;
        let arrEmpty = [];
        let filteredPosts = posts.concat(arrEmpty);
        return {
            ...state,
            posts,
            filteredPosts
        };

        case type.FILTER_BY_VALUE:
            let newState = Object.assign({}, state);
            let value = action.payload.value;
            let filteredValues = state.posts.filter(product => {
                return product.title.toLowerCase().includes(value)
            });
            let usedFilters = state.usedFilters;
            if (value) {
                let index = usedFilters.indexOf(type.FILTER_BY_VALUE);
                if (index === -1)
                    usedFilters.push(type.FILTER_BY_VALUE);
                    newState.filteredPosts = filteredValues;
            } else {
                let index = usedFilters.indexOf(type.FILTER_BY_VALUE);
                usedFilters.splice(index, 1);
                if (usedFilters.length === 0) {
                    newState.filteredPosts = newState.posts;
                };
            };
            return newState;

        case type.SORT_POSTS_BY_USER:
            let sortByUserId = Object.assign({}, state);
            let sortedUserArr =
                action.payload.direction === "asc"
                ? sortAsc(state.filteredPosts, "userId")
                : sortDesc(state.filteredPosts, "userId");

                sortByUserId.filteredPosts = sortedUserArr;
                sortByUserId.usedFilters = addFilterNotExists(
                type.SORT_POSTS_BY_USER,
                sortByUserId.usedFilters
            );
            sortByUserId.usedFilters = removeFilter(
                type.SORT_POSTS_BY_USER,
                sortByUserId.usedFilters
            );
            return sortByUserId;

        case type.REMOVE_POST:
            let deletePost = Object.assign({}, state);
            let id = action.payload.id;
            
            const deletionInMainArr = state.posts.filter(item => item.id !== id);
            deletePost.posts = deletionInMainArr;

            const deletionInWorkArr = state.filteredPosts.filter(item => item.id !== id);
            deletePost.filteredPosts = deletionInWorkArr;
            return deletePost;

        case type.NEW_POST:
            let pushPost = Object.assign({}, state);
            let newPostObj = action.payload;
            
            const pushToMainArr = [ newPostObj, ...state.posts];
            pushPost.posts = pushToMainArr;
    
            const pushToWorkArr = [ newPostObj, ...state.filteredPosts];
            pushPost.filteredPosts = pushToWorkArr;
            return pushPost; 

        case type.UPDATE_POST:
            const elementsIndex = state.posts.find(element => element.id == action.payload.id);
            elementsIndex.title = action.payload.title;
            elementsIndex.body = action.payload.body;
            return state
       default:
           return state;
   };
};

export default postsReducer;

function sortAsc(arr, field) {
    return arr.sort(function(a, b) {
      if (a[field] > b[field]) return 1;
      if (b[field] > a[field]) return -1;
      return 0;
    });
};
  
function sortDesc(arr, field) {
    return arr.sort(function(a, b) {
      if (a[field] > b[field]) return -1;
      if (b[field] > a[field]) return 1;
      return 0;
    });
};

function addFilterNotExists(filter, usedFilters) {
    let index = usedFilters.indexOf(filter);
    if (index === -1) usedFilters.push(filter);
    return usedFilters;
};

function removeFilter(filter, usedFilters) {
    let index = usedFilters.indexOf(filter);
    usedFilters.splice(index, 1);
    return usedFilters;
};