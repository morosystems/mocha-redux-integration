import {NAME} from './constants';

const getModel = (state) => state.get(NAME);

/**
 * Returns list of loaded characters' ids
 * @param state
 */
export const getCharacterIds = (state) => getModel(state).get('characterList');
/**
 * Returns loaded character by id.
 * @param state
 * @param id
 */
export const getCharacter = (state, id) => getModel(state).getIn(['characters', id]);

const getCharacterCount = (state) => getCharacterIds(state).size;

/**
 * Returns whether there are more characters satisfying the query to be loaded, regardless of limit.
 * @param state
 */
export const canLoadMore = (state) => getModel(state).get('total') > getCharacterCount(state);

/**
 * Returns whether more characters should be loaded.
 * @param state
 */
export const isLoading = (state) => canLoadMore(state) && (getModel(state).get('limit') > getCharacterCount(state));
