Mock Store 
==========

Mock store contains redux state on which action can be applied

You can use it separately if you so desire:
```javascript
import {MockStore} from 'mocha-redux-integration';
```  

### `constructor(reducer, ?path)`
Creates mock store with specified reducer and optionally a its path inside the state tree,
which is created by calling `combineReducers` from `redux-immutable`. This means the state
pertaining to the reducer can be obtained by calling `state.getIn(path)`.

Path can be specified either as an array or a single string literal.

### `apply(...actions)`
Applies a sequence of actions on state using reducer and returns a new mock store with the resulting state
(the interface is fluent).

### `select(selector, ...params)`
Uses selector to retrieve value from state and returns it. Additional selector params can be specified.
