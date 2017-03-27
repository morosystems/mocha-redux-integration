import {MockStore} from '../src';
import {NAME} from './constants';
import reducer from './reducer';
import {setQuery} from './actions';
import {getCharacterIds, isLoading, canLoadMore} from './selectors';

describe('Character Search Module', () => {
    const initial = new MockStore(reducer, NAME);
    context('intial state', () => {
        it('given initial state', () => {});
        it('then there are no characters', () => {
            initial.select(getCharacterIds).should.be.empty();
        });
        it('and it is not loading', () => {
            initial.select(isLoading).should.be.false();
        });
        it('and it cannot load more', () => {
            initial.select(canLoadMore).should.be.false();
        });
    });
    context('first query', () => {
        let store = initial;
        it('given initial state', () => {});
        it('when search is initialized', () => {
            store = store.apply(setQuery('Bridgeburners'));
        });
        it('then there are no characters', () => {
            store.select(getCharacterIds).should.be.empty();
        });
        it('and it is loading', () => {
            store.select(isLoading).should.be.true();
        });
        it('and it can load more', () => {
            store.select(canLoadMore).should.be.true();
        });
    });
});
