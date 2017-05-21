import invariant from 'invariant';

export default (params) => function then() {
    invariant(this.store, 'Given must be specified for then');
    const selector = params[0];
    const assertion = params[params.length - 1];
    const selectorParams = params.slice(1, -1);
    const result = this.store.select(selector, ...selectorParams);
    assertion(result);
};
