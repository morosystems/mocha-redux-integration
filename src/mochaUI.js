import invariant from 'invariant';
import Mocha from 'mocha';
import Suite from 'mocha/lib/suite';
import Test from 'mocha/lib/test';
import createCommonSuite from 'mocha/lib/interfaces/common';

import MockStore from './MockStore';
import ResultStore from './ResultStore';

const mochaUI = (suite) => {
    const suites = [suite];
    suite.on('pre-require', (context, file, mocha) => {
        const common = createCommonSuite(suite, context);

        // eslint-disable-next-line no-param-reassign
        context.run = mocha.options.delay && common.runWithSuite(suite);

        // eslint-disable-next-line no-param-reassign
        context.feature = (title, reducer, path, fn) => {
            const pathDefined = !!fn;

            const feature = Suite.create(suites[0], title);
            feature.file = file;
            feature.initial = new MockStore(reducer, pathDefined ? path : undefined);
            feature.results = new ResultStore();

            suites.unshift(feature);
            (pathDefined ? fn : path).call(feature);
            suites.shift();

            return feature;
        };

        // eslint-disable-next-line no-param-reassign
        context.scenario = (title, fn) => {
            invariant(suites[0].initial, 'Scenario must be inside feature.');

            const scenario = Suite.create(suites[0], title);
            scenario.file = file;
            scenario.initial = suites[0].initial;
            scenario.results = suites[0].results;

            suites.unshift(scenario);
            fn.call(scenario);
            suites.shift();

            return scenario;
        };

        // eslint-disable-next-line no-param-reassign
        context.given = (title) => {
            invariant(suites[0].initial, 'Given must be inside scenario');

            let test;
            if (!title) {
                test = new Test('given initial state', function given() {
                    this.store = this.test.parent.initial;
                });
            } else {
                test = new Test(`given ${title}`, function given() {
                    this.store = this.test.parent.results.get(title);
                });
            }

            test.file = file;
            suites[0].addTest(test);
            return test;
        };

        // eslint-disable-next-line no-param-reassign
        context.when = (title, ...actions) => {
            const test = new Test(`when ${title}`, function when() {
                invariant(this.store, 'Given must be specified for when.');
                this.store = this.store.apply(...actions);
            });
            test.file = file;
            suites[0].addTest(test);
            return test;
        };

        // eslint-disable-next-line no-param-reassign
        context.then = (title, selector, parameters, fn) => {
            const paramsDefined = !!fn;
            const test = new Test(`then ${title}`, function then() {
                invariant(this.store, 'Given must be specified for then.');
                const result = paramsDefined
                    ? this.store.select(selector, parameters)
                    : this.store.select(selector);
                (paramsDefined ? fn : parameters)(result);
            });
            test.file = file;
            suites[0].addTest(test);
            return test;
        };

        // eslint-disable-next-line no-param-reassign
        context.result = (title) => {
            suites[0].afterAll(function storeResult() {
                this.test.parent.results.set(title, this.store);
            });
        };
    });
};

Mocha.interfaces['redux-integration'] = mochaUI;

export default mochaUI;
