import invariant from 'invariant';
import Mocha from 'mocha';
import Suite from 'mocha/lib/suite';
import Test from 'mocha/lib/test';
import createCommonSuite from 'mocha/lib/interfaces/common';
import MockStore from './MockStore';

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
            scenario.store = suites[0].initial;

            suites.unshift(scenario);
            fn.call(scenario);
            suites.shift();

            return scenario;
        };

        // eslint-disable-next-line no-param-reassign
        context.when = (title, ...actions) => {
            invariant(suites[0].store, 'When must be inside scenario.');

            const test = new Test(`when ${title}`, function when() {
                this.test.parent.store = this.test.parent.store.apply(...actions);
            });
            test.file = file;
            suites[0].addTest(test);
            return test;
        };

        // eslint-disable-next-line no-param-reassign
        context.then = (title, selector, parameters, fn) => {
            invariant(suites[0].store, 'Then must be inside scenario.');
            const paramsDefined = !!fn;

            const test = new Test(`then ${title}`, function then() {
                const result = paramsDefined
                    ? this.test.parent.store.select(selector, parameters)
                    : this.test.parent.store.select(selector);
                (paramsDefined ? fn : parameters)(result);
            });
            test.file = file;
            suites[0].addTest(test);
            return test;
        };
    });
};

Mocha.interfaces['redux-integration'] = mochaUI;

export default mochaUI;
