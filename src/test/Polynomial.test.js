import {assert,expect} from 'chai';
import Polynomial from '../classes/Polynomial';


describe('Polynomial',function(){
    let result = new Polynomial('5 -3x^-6 +x^2 +x^3').get();
    


    it('Should return right polynomial ',function(){
        expect(result).to.equal( 'x^3+x^2+5-3x^-6');
    })

    it('Should return type string',function(){
        assert.typeOf(result,'string');
    });

    it('Negative exponents',function(){
        let result = new Polynomial('5 -3x^-6 +x^-2 +x^-3').get();
        expect(result).to.equal('5+x^-2+x^-3-3x^-6');
    });
    it('Positive exponents',function(){
        let result = new Polynomial('5 -3x^6 +x^2 +x^3').get();
        expect(result).to.equal('-3x^6+x^3+x^2+5');
    });

    it('Real numbers for coefficients and exponents',function(){
        let result = new Polynomial('-3.5x^0.4 + 2.4x^0.5 - 30x^-0.4 + x^0.4').get();
        expect(result).to.equal('2.4x^0.5-2.5x^0.4-30x^-0.4');
    });

    it('Space between coefficients',function(){
        let result = new Polynomial('2x + 4x + 20x^2 + 5').get();
        expect(result).to.equal('20x^2+6x+5');
    });

    it('Add two polynomials',function(){
        let result = new Polynomial('-3.5x^0.4 + 2.4x^0.5 - 30x^-0.4 + x^0.4');
        result.add('x^2 - 20x^5 - 92.2x^-21.2');
        expect(result.get()).to.equal('-20x^5+x^2+2.4x^0.5-2.5x^0.4-30x^-0.4-92.2x^-21.2');
    });

    it('Random text between polynomial',function(){
        let result = new Polynomial('x^2dsadasdas +dsadsaads + x^3').get();
        expect(result).to.equal('x^3+x^2');
    });
    it('Random text without polymonial',function(){
        let result = new Polynomial('asddsasdadsadas').get();
        expect(result).to.equal('');
    });
    it('Empty',function(){
        let result = new Polynomial().get();
        expect(result).to.equal('');
    });

    it('Order of exponents',function(){
        let result = new Polynomial('x^2 + x^-5 + 5');
        result._sort();
        expect(result.exponentsOrder).to.eql(['2','0','-5']);
    });

   


});