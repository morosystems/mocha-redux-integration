import {spy} from 'sinon';
import when from './when';

describe('when test creator', () => {
    const callTest = (apply, ...actions) => {
        const test = when(actions);
        test.call({store: {apply}});
    };

    const createAction = () => ({type: 'SIMPLE_ACTION'});
    const addCharacter = (name, squad) => ({
        type: 'ADD_CHARACTER',
        name,
        squad,
    });

    it('throws an error when there is no store', () => {
        const test = when([createAction]);
        (() => test.call({})).should.throw();
    });
    it('applies single action', () => {
        const apply = spy();
        callTest(apply, createAction);

        apply.should.have.been.calledOnce();
        apply.should.have.been.calledWith(createAction());
    });
    it('sets the store with applied actions to context', () => {
        const updatedStore = {state: 'Store has been updated'};
        const context = {store: {apply: () => updatedStore}};
        when([createAction]).call(context);
        context.store.should.equal(updatedStore);
    });
    it('applies single action with parameters', () => {
        const apply = spy();
        callTest(apply, addCharacter, 'Strings', 4);

        apply.should.have.been.calledOnce();
        apply.should.have.been.calledWith(addCharacter('Strings', 4));
    });
    it('applies multiple actions', () => {
        const createAnotherAction = () => ({type: 'ANOTHER_ACTION'});
        const apply = spy();
        callTest(apply, [createAction], [createAnotherAction]);

        apply.should.have.been.calledOnce();
        apply.should.have.been.calledWith(createAction(), createAnotherAction());
    });
    it('applies multiple actions with parameters', () => {
        const apply = spy();
        callTest(
            apply,
            [addCharacter, 'Strings', 4],
            [addCharacter, 'Tarr', 4],
        );

        apply.should.have.been.calledOnce();
        apply.should.have.been.calledWith(addCharacter('Strings', 4), addCharacter('Tarr', 4));
    });

    it('skips dependent tests when action cannot be created');
    it('skips dependent tests when action cannot be applied');
    it('throws error when action cannot be created');
    it('throws error when action cannt be applied');
});
