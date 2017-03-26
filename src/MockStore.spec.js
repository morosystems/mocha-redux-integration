import {Record, Map} from 'immutable';
import MockStore from './MockStore';

describe('Mock Store', () => {
    const set = (key, value) => ({
        type: 'SET',
        key,
        value,
    });
    const initial = Map({A: 42});
    const reducer = (state = initial, action) => (action.type === 'SET' ? state.set(action.key, action.value) : state);
    const get = (state, key) => state.get(key);
    const store = new MockStore(reducer);

    describe('constructor', () => {
        it('creates a Record', () => {
            store.should.be.an.instanceOf(Record);
        });
        it('creates a reducer', () => {
            store.reducer.should.be.a('function');
        });
        it('creates a store without combineReducers nesting when no path is specified', () => {
            store.state.should.equal(initial);
        });
        it('creates a store with one level of combineReducers nesting when one segment is specified', () => {
            const nested = new MockStore(reducer, 'PATH');
            nested.state.get('PATH').should.equal(initial);
        });
        it('creates a store with deep combineReducers nesting when a path array is specified', () => {
            const path = ['LONG', 'PATH', 'FRAGMENT'];
            const nested = new MockStore(reducer, path);
            nested.state.getIn(path).should.equal(initial);
        });
    });
    describe('apply method', () => {
        const changed = store.apply(set('A', 12));
        it('returns new reference', () => {
            changed.should.not.equal(store);
        });
        it('changes state', () => {
            changed.state.should.not.equal(store.state);
        });
        it('does not change the reducer', () => {
            changed.reducer.should.equal(store.reducer);
        });
        it('applies action', () => {
            get(changed.state, 'A').should.equal(12);
        });
        it('can apply multiple actions', () => {
            const result = store.apply(
                set('A', 12),
                set('B', 42),
            );
            get(result.state, 'A').should.equal(12);
            get(result.state, 'B').should.equal(42);
        });
    });
    describe('select method', () => {
        it('returns selector value', () => {
            store.select(get, 'A').should.equal(42);
        });
    });
});
