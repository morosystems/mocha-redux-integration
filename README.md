# mocha-redux-integration
Integration testing of redux stores with mocha.

## Motivation
As all components which operate over redux store (action creators, reducers and selectors) are pure functions, we can easily unit test them. However, such tests have two deficiencies:
1. They do not check that components work with each other. When a programmer modifies reducer and hence the state shape but neglects to change selectors accordingly, the store breaks down without unit tests detecting it.
2. They are fragile. When a programmer changes the state shape (e.g. for optimization), all reducer tests have to be rewritten despite the store function staying the same.

To solve these problems, we should test the whole structure, starting with action creators and finishing with selectors. Also, to allow state shape changes, we should only test input/output behaviour, that is:
1. Given a store's initial shape.
2. We apply a sequence of actions.
3. And test that selectors return expected values.

The aim of this project is to offer a [custom mocha UI](https://github.com/mochajs/mocha/wiki/Third-party-UIs) to facilitate these tests. The test structure seems to be best represented by given-when-then syntax with **given** being initial state, **when** applied actions and **then** assertions on selector results.

Note: This approach to testing was designed to test redux modules (see [Jack Hsu's article](https://jaysoo.ca/2016/02/28/organizing-redux-application/)).

## Use
Currently, the project is at an experimental stage: there is no npm package. However, you can clone the repo and try it out.
```
git clone https://github.com/tomvej/mocha-redux-integration.git
npm install
```

There is an example of use in the [example folder](https://github.com/tomvej/mocha-redux-integration/blob/master/example/README.md). You can execute it with `npm run example`.
The test definitions are located in [redux.spec.js](https://github.com/tomvej/mocha-redux-integration/blob/master/example/redux.spec.js).

You can also write your own tests and execute them:
```
    mocha --compilers js:babel-register --require src --ui redux-integration [your test files]
```
