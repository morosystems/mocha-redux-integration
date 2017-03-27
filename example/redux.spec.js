import {NAME} from './constants';
import reducer from './reducer';
import {setQuery} from './actions';
import {getCharacterIds, isLoading, canLoadMore} from './selectors';

feature('Character Search Module', reducer, NAME, () => {
    scenario('intial state', () => {
        then('there are no characters', getCharacterIds, (result) => result.should.be.empty());
        then('it is not loading', isLoading, (result) => result.should.be.false());
        then('it cannot load more', canLoadMore, (result) => result.should.be.false());
    });
    scenario('first query', () => {
        when('search is initialized', setQuery('Bridgeburners'));
        then('there are no characters', getCharacterIds, (result) => result.should.be.empty());
        then('it is loading', isLoading, (result) => result.should.be.true());
        then('it can load more', isLoading, (result) => result.should.be.true());
    });
});
