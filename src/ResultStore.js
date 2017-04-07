import invariant from 'invariant';
import MockStore from './MockStore';

class ResultStore {
    constructor() {
        this.map = new Map();
    }

    set(description, value) {
        invariant(!this.map.get(description), `Description "${description}" has already been used.`);
        invariant(value instanceof MockStore, `Cannot store ${value}, it is not mock store`);
        this.map.set(description, value);
    }

    get(description) {
        const result = this.map.get(description);
        invariant(result, `There is no state for "${description}".`);
        return result;
    }
}

export default ResultStore;
