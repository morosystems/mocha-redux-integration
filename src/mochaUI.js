import Mocha from 'mocha';
import Suite from 'mocha/lib/suite';
import Test from 'mocha/lib/test';
import createCommonSuite from 'mocha/lib/interfaces/common';

const mochaUI = (suite) => {
    const suites = [suite];
    suite.on('pre-require', (context, file, mocha) => {
        const common = createCommonSuite(suite, context);

        // eslint-disable-next-line no-param-reassign
        context.run = mocha.options.delay && common.runWithSuite(suite);

        // eslint-disable-next-line no-param-reassign
        context.feature = (title, fn) => {
            const feature = Suite.create(suites[0], title);
            feature.file = file;
            suites.unshift(feature);
            fn.call(feature);
            suites.shift();

            return feature;
        };

        // eslint-disable-next-line no-param-reassign
        context.scenario = context.feature;

        // eslint-disable-next-line no-param-reassign
        context.it = (title, fn) => {
            const test = new Test(title, fn);
            test.file = file;
            suites[0].addTest(test);
            return test;
        };
    });
};

Mocha.interfaces['redux-integration'] = mochaUI;

export default mochaUI;
