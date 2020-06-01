import {assert} from 'chai';
import Polynomial from '../classes/Polynomial';


describe('Polynomial',function(){
    let result = new Polynomial('5 -3x^-6 +x^2 +x^3').get();
    


    it('Should return right polynomial ',function(){
        assert.equal(result, '+x^3+x^2+5-3x^-6');
    })

    it('Should return type string',function(){
        assert.typeOf(result,'string');
    });

});