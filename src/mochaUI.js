import invariant from 'invariant';
import Mocha from 'mocha';
import Suite from 'mocha/lib/suite';
import Test from 'mocha/lib/test';
import createCommonSuite from 'mocha/lib/interfaces/common';

import MockStore from './MockStore';
import ResultStore from './ResultStore';
import {executeCommandWithDependentTests} from './mochaHelpers';
import when from './when';
import then from './then';

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
                    executeCommandWithDependentTests(this.test, () => {
                        this.store = this.test.parent.results.get(title);
                    });
                });
            }

            test.file = file;
            suites[0].addTest(test);
            return test;
        };

        // eslint-disable-next-line no-param-reassign
        context.when = (title, ...actions) => {
            const test = new Test(`when ${title}`, when(actions));
            test.file = file;
            suites[0].addTest(test);
            return test;
        };

        // eslint-disable-next-line no-param-reassign
        context.then = (title, ...params) => {
            const test = new Test(`then ${title}`, then(params));
            test.file = file;
            suites[0].addTest(test);
            return test;
        };

        // eslint-disable-next-line no-param-reassign
        context.thenP = (title, selector, ...params) => {
            const assertion = params[params.length - 1];
            const paramValueSets = params.slice(0, -1);
            return paramValueSets
                .map((paramValues) => then([selector, ...paramValues, (result) => assertion(result, ...paramValues)]))
                .map((testFn, index) => {
                    const test = new Test(`then ${title} [${index}]`, testFn);
                    test.file = file;
                    suites[0].addTest(test);
                    return test;
                });
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
