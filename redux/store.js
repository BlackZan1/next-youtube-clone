import { createStore } from 'redux'; 
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

export const SET_SEARCH_ITEMS = 'search/SET_SEARCH_ITEMS';

let initialState = {
    search: {
        items: []
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state, 
                ...action.payload
            }
        case SET_SEARCH_ITEMS:
            return {
                ...state, 
                search: {
                    items: action.items
                }
            }
        default:
            return state;
    }
};

export const setSearchItemsAction = (items) => ({ type: SET_SEARCH_ITEMS, items });

const makeStore = (ctx) => createStore(reducer);

export const wrapper = createWrapper(makeStore, { debug: true });