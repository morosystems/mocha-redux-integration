Mocha UI
========

### `feature(title, reducer, path?, fn)`
Wraps all tests of a reducer and related action creators and selectors. Initializes a mock store
which is used to test the module. Contains multiple [`scenario`s](#scenariotitle-fn). Based on Mocha's `describe`.

#### Arguments
* `title` (String): Name of the redux module.
* `reducer` (Function): Main reducer of the module.
* `path` (Array or String, optional): Path in state where the reducer's state is supposed to be (when selectors require it).
    May be either a string or an array of strings. The reducer is wrapped in `combineReducers` from `redux-immutable`,
    so that the reducer's state can be accessed using `state.getIn(path)` (or `state.get(path)` when it is a string).
* `fn` (Function): Comprising scenarios.

### `scenario(title, fn)`
Wraps a single given-when-then test scenario. Must contain exactly one [`given`](#giventitle)
followed by zero or more [`when`s](#whentitle-actioncreator-params), followed by zero or more
[`then`s](#thentitle-selector-selectorparams-assertion) or [parametrized `then`s](#thenptitle-selector-params1-params2-assertion),
optionally followed by a [`result`](#resulttitle). Based on Mocha's `context`.

#### Arguments
* `title` (String): Scenario description.
* `fn` (Function): Comprising tests.

### `given(title?)`
Specifies initial state of a scenario. May be a resulting state of previous test (see [`result`](#resulttitle)).

#### Arguments
* `title` (String, optional): References previous `result` call. When empty, uses reducer's initial state.

### `when(title, actionCreator, ...params)`
Applies single action. Action creator and its arguments are specified separately, so that we can catch errors in action creator, e.g.:
```javascript
when('search query is set', setQuery, 'Bonehunters');
```
applies the action `setQuery('Bonehunters')`.

#### Arguments
* `title` (String): Description of what the action does.
* `actionCreator` (Function): Action creator function.
* `params` (Any, spread): Action creator arguments.

### `when(title, [actionCreator, ...params], [actionCreator, ...params], ...)`
Applies multiple actions. Each action creator and its arguments are specified in a single array, e.g.:
```javascript
when('search query is set and changed', [setQuery, 'Bridgeburners'], [setQuery, 'Bonehunters']);
```

#### Arguments
* `title` (String): Description of what the action does.
* `actionCreator` (Function): Action creator function.
* `params` (Any, spread): Action creator arguments.

### `then(title, selector, ...params, assertion)`
Specifies assertion on state. A selector is used to retrieve value from state and the assertion is called on it.
You can use any existing assertion library.

```javascript
then('character can be retrieved', getCharacter, 0, (result) => result.should.exist());
```
roughly translates to
```javascript
it('character can be retrieved', () => {
    getCharacter(state, 0).should.exist();
});
```

#### Arguments
* `title` (String): Assertion description.
* `selector` (Function): Selector function used to retrieve value from state.
* `params` (Any, spread): Selector arguments.
* `assertion` (Function): Callback function which is called on the retrieved values.

### `thenP(title, selector, [...params1], [...params2], ..., assertion)`
Parametric assertion. Uses one selector with several parameter sets and then checks them with parametrized assertion.
E.g. you can write:

```javascript
then(
    'all characters can be retrieved', 
    getCharacter, 
    [0], [1], [2], [3], 
    (result, id) => result.should.equal(character[id]),
);
```
roughly translates to
```javascript
it('all characters can be retrieved', () => {
    getCharacter(state, 0).should.equal(character[0]);
    getCharacter(state, 1).should.equal(character[1]);
    getCharacter(state, 2).should.equal(character[2]);
    getCharacter(state, 3).should.equal(character[3]);
});
```

#### Arguments
* `title` (String): Assertion description.
* `selector` (Function): Selector function used to retrieve value from state.
* `[params1]` (Any, spread): array of parameters for single selector and assertion call.
* `assertion(result, ...params)` (Function): Parametrized assertion. Called with selector call results and parameters with which the selector was called. 

### `result(title)`
Can be used to store resulting state of a scenario under a string identifier. It can be later used as an initial state
for a scenario using [`given`](#giventitle).

#### Arguments
* `title` (String): String identifier of the state. Used in `given` to use the state.
