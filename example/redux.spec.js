import {fromJS} from 'immutable';
import {NAME} from './constants';
import reducer from './reducer';
import {setQuery, addCharacters} from './actions';
import {getCharacterIds, isLoading, canLoadMore, getCharacter} from './selectors';

feature('Character Search Module', reducer, NAME, () => {
    const bonehunters = [
        {id: 0, name: 'Strings', alias: 'Fiddler', squad: 4, rank: 'sgt'},
        {id: 1, name: 'Tarr', squad: 4, rank: 'cpl'},
        {id: 2, name: 'Cuttle', squad: 4},
        {id: 3, name: 'Bottle', squad: 4},
        {id: 4, name: 'Koryk', squad: 4},
        {id: 5, name: 'Smiles', squad: 4},
        {id: 6, name: 'Corabb Bhilan Thenu\'alas', squad: 4},
        {id: 7, name: 'Gesler', squad: 5, rank: 'sgt'},
        {id: 8, name: 'Stormy', squad: 5, rank: 'cpl'},
        {id: 9, name: 'Sands', squad: 5},
        {id: 10, name: 'Shortnose', squad: 5},
        {id: 11, name: 'Flashwit', squad: 5},
        {id: 12, name: 'Uru Hela', squad: 5},
        {id: 13, name: 'Mayfly', squad: 5},
        {id: 14, name: 'Cord', squad: 7, rank: 'sgt'},
        {id: 15, name: 'Shard', squad: 7, rank: 'cpl'},
        {id: 16, name: 'Limp', squad: 7},
        {id: 17, name: 'Ebron', squad: 7},
        {id: 18, name: 'Crump', squad: 7},
        {id: 19, name: 'Sinn', squad: 7},
        {id: 20, name: 'Hellian', squad: 8, rank: 'sgt'},
        {id: 21, name: 'Touchy', squad: 8, rank: 'cpl'},
        {id: 22, name: 'Breathless', squad: 8, rank: 'cpl'},
        {id: 23, name: 'Balgrid', squad: 8},
        {id: 24, name: 'Maybe', squad: 8},
        {id: 25, name: 'Lutes', squad: 8},
        {id: 26, name: 'Balm', squad: 9, rank: 'sgt'},
        {id: 27, name: 'Deadsmell', squad: 9, rank: 'cpl'},
        {id: 29, name: 'Throatslitter', squad: 9},
        {id: 30, name: 'Galt', squad: 9},
        {id: 31, name: 'Lobe', squad: 9},
        {id: 32, name: 'Widdershins', squad: 9},
        {id: 33, name: 'Thom Tissy', squad: 12, rank: 'sgt'},
        {id: 34, name: 'Tulip', squad: 12, rank: 'cpl'},
        {id: 35, name: 'Ramp', squad: 12},
        {id: 36, name: 'Jibb', squad: 12},
        {id: 37, name: 'Gullstream', squad: 12},
        {id: 38, name: 'Mudslinger', squad: 12},
        {id: 39, name: 'Bellig Harn', squad: 12},
        {id: 40, name: 'Urb', squad: 13, rank: 'sgt'},
        {id: 41, name: 'Reem', squad: 13, rank: 'cpl'},
        {id: 42, name: 'Masan Gilani', squad: 13},
        {id: 43, name: 'Bowl', squad: 13},
        {id: 44, name: 'Hanno', squad: 13},
        {id: 45, name: 'Saltlick', squad: 13},
        {id: 46, name: 'Scant', squad: 13},
    ];
    scenario('intial state', () => {
        given();
        then('there are no characters', getCharacterIds, (result) => result.should.be.empty());
        then('it is not loading', isLoading, (result) => result.should.be.false());
        then('it cannot load more', canLoadMore, (result) => result.should.be.false());
    });
    const INITIALIZED_SEARCH = 'initialized search';
    scenario('first query', () => {
        given();
        when('search is initialized', setQuery('Bonehunters'));
        then('there are no characters', getCharacterIds, (result) => result.should.be.empty());
        then('it is loading', isLoading, (result) => result.should.be.true());
        then('it can load more', isLoading, (result) => result.should.be.true());
        result(INITIALIZED_SEARCH);
    });
    scenario('first empty query', () => {
        given();
        when('search is initialized with empty query', setQuery(''));
        then('there are no characters', getCharacterIds, (result) => result.should.be.empty());
        then('it is not loading', isLoading, (result) => result.should.be.false());
        then('it cannot load more', canLoadMore, (result) => result.should.be.false());
    });
    scenario('adding less than total characters before limit', () => {
        given(INITIALIZED_SEARCH);
        const characters = bonehunters.slice(0, 10);
        when('characters are added', addCharacters(characters, bonehunters.length));
        then('then their ids are in the list', getCharacterIds,
            (result) => characters.forEach(({id}) => result.should.include(id)));
        then('they can be displayed', getCharacter, [0], (result) => result.should.equal(fromJS(characters[0])));
        then('it is loading', isLoading, (result) => result.should.be.true());
        then('it can load more', isLoading, (result) => result.should.be.true());
    });
});
