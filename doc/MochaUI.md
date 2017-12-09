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

### `when(title, actionCreator, ...params)`

### `when(title, [actionCreator, ...params], [actionCreator, ...params], ...)`

### `then(title, selector, ...selectorParams, assertion)`

### `thenP(title, selector, [...params1], [...params2], ..., assertion)`

### `result(title)`
