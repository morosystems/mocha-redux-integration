import {spy, stub} from 'sinon';
import then from './then';

describe('then test creator', () => {
    it('throws error when there is no store', () => {
        const test = then([() => {}, () => {}]);
        (() => test.call({})).should.throw();
    });
    it('applies assertion on result of argument-less selector', () => {
        const assertion = spy();
        const selector = () => {};
        const select = stub();
        const result = 'This is a result of selector call.';
        select.withArgs(selector).returns(result);

        then([selector, assertion]).call({store: {select}});
        assertion.should.have.been.calledOnce();
        assertion.should.have.been.calledWith(result);
    });
    it('applies assertion on result of selector with arguments', () => {
        const assertion = spy();
        const selector = () => {};
        const select = stub();
        const result = 'This is a result of a different selector call.';
        select.withArgs(selector, 1, 'A', 3).returns(result);

        then([selector, 1, 'A', 3, assertion]).call({store: {select}});
        assertion.should.have.been.calledOnce();
        assertion.should.have.been.calledWith(result);
    });
});
