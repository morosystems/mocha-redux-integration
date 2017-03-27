import {NAME} from './constants';

export const SET_QUERY = `${NAME}/SET_QUERY`;
export const ADD_CHARACTERS = `${NAME}/ADD_CHARACTERS`;
export const LOAD_MORE = `${NAME}/LOAD_MORE`;

/**
 * Sets search query.
 * @param query New search query.
 */
export const setQuery = (query) => ({
    type: SET_QUERY,
    query,
});

/**
 * Adds search results -- characters -- to the store.
 * @param characters An array of characters.
 * @param total Total number of characters found by query.
 */
export const addCharacters = (characters, total) => ({
    type: ADD_CHARACTERS,
    characters,
    total,
});

/**
 * Increases limit.
 */
export const loadMore = () => ({
    type: LOAD_MORE,
});
