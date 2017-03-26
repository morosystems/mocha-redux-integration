import 'babel-polyfill';
import chai, {should} from 'chai';
import chaiImmutable from 'chai-immutable';
import dirtyChai from 'dirty-chai';

chai.use(chaiImmutable);
chai.use(dirtyChai);

should();
