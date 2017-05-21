import invariant from 'invariant';
import {skipDependentTests} from './mochaHelpers';

const createAction = (args) => args[0].apply(null, args.slice(1));

export default (actions) => function when() {
    invariant(this.store, 'Given must be specified for when');

    try {
        const multiple = Array.isArray(actions[0]);
        const actualActions = multiple ? actions.map(createAction) : [createAction(actions)];
        this.store = this.store.apply(...actualActions);
    } catch (error) {
        skipDependentTests(this.test);
        throw error;
    }
};
