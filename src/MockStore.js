import invariant from 'invariant';
import {Record} from 'immutable';
import {combineReducers} from 'redux-immutable';

export default class MockStore extends Record({state: null, reducer: null}) {
    constructor(reducer, path = []) {
        invariant(typeof reducer === 'function', 'Reducer must be a function.');
        const finalPath = Array.isArray(path) ? path : [path];
        const finalReducer = finalPath.reduceRight((result, segment) => combineReducers({[segment]: result}), reducer);
        super({
            reducer: finalReducer,
            state: finalReducer(undefined, {}),
        });
    }

    apply(...actions) {
        const newState = actions.reduce(this.reducer, this.state);
        return this.set('state', newState);
    }

    select(selector, ...parameters) {
        return selector(this.state, ...parameters);
    }
}
