import Mocha from 'mocha';
import Suite from 'mocha/lib/suite';
import Test from 'mocha/lib/test';

const mochaUI = function mochaUI(suite) {
    const suites = [suite];
    suite.on('pre-require', function(context, file, mocha) {
        const common = require('mocha/lib/interfaces/common')(suite, context);

        context.run = mocha.options.delay && common.runWithSuite(suite);
        context.feature = function(title, fn) {
            const suite = Suite.create(suites[0], title);
            suite.file = file;
            suites.unshift(suite);
            fn.call(suite);
            suites.shift();

            return suite;
        };

        context.scenario = context.feature;
        context.it = function(title, fn) {
            const suite = suites[0];
            const test = new Test(title, fn);
            test.file = file;
            suite.addTest(test);
            return test;
        };
    });
};

Mocha.interfaces['redux-integration'] = mochaUI;

export default mochaUI;
