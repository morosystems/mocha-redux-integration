import Mocha from 'mocha';
import reduxIntegration from './mochaUI';
import MockStore from './MockStore';

Mocha.interfaces['mocha-redux-integration'] = reduxIntegration;
module.exports = reduxIntegration;
module.exports.MockStore = MockStore;
