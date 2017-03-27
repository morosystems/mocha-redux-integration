import {combineReducers} from 'redux-immutable';
import {List, Map, fromJS} from 'immutable';
import {LIMIT, LIMIT_INCREMENT} from './constants';
import {SET_QUERY, ADD_CHARACTERS, LOAD_MORE} from './actions';

const queryReducer = (state = null, action) => (action.type === SET_QUERY ? action.query : state);

const characterListReducer = (state = List(), action) => {
    switch (action.type) {
        case SET_QUERY:
            return List();
        case ADD_CHARACTERS:
            return state.concat(action.characters.map(({id}) => id));
        default:
            return state;
    }
};

const characterReducer = (state = Map(), action) => {
    switch (action.type) {
        case SET_QUERY:
            return Map();
        case ADD_CHARACTERS:
            return state.merge(Map(action.characters.map((character) => [character.id, fromJS(character)])));
        default:
            return state;
    }
};

const limitReducer = (state = LIMIT, action) => {
    switch (action.type) {
        case SET_QUERY:
            return LIMIT;
        case LOAD_MORE:
            return state + LIMIT_INCREMENT;
        default:
            return state;
    }
};

const totalReducer = (state = 0, action) => {
    switch (action.type) {
        case SET_QUERY:
            return Number.POSITIVE_INFINITY;
        case ADD_CHARACTERS:
            return action.total;
        default:
            return state;
    }
};

const reducer = combineReducers({
    query: queryReducer,
    characterList: characterListReducer,
    characters: characterReducer,
    limit: limitReducer,
    total: totalReducer,
});

export default (state, action) => {
    if (action.type === SET_QUERY && state && state.get('query') === action.query) {
        return state;
    } else {
        return reducer(state, action);
    }
};
