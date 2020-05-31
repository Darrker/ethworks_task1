

class Polynomial {
    polynomial = {};
    exponentsOrder =[];
    regex = /([+-])\s?(\d*x?)\^?([+-])?\s?(\d+)?/g;
    constructor(polynomial){
        this.analize(polynomial);
    }
    analize(polynomial){
        let regex = this.regex;
        let search;
        while(search=regex.exec(polynomial)){
            this.add(search);
          
        }
    }
    add(value){
          let coefficientSymbol = this._ifExist(value[1]) ? value[1] :  '';
          let coefficient = this._ifExist(value[2]) ? value[2] : false ;
          let exponentSymbol = this._ifExist(value[3]) ?   value[3] : '' ;
          let exponent = this._ifExist(value[4]) ? value[4] : false ;
        
          if(coefficient){
            var ifCoefficientHasVariable = coefficient.includes('x'); 

            if(ifCoefficientHasVariable){
                if(this._ifVariableContainsCoefficient(value[2])){
                    coefficient = coefficient.slice(0,-1) ;
                
                 }
                 else{
                    coefficient = 1;
                 }

                 if(exponent){
                    if(this._ifExist(this.polynomial[exponentSymbol+exponent])){
                        this.polynomial[exponentSymbol+exponent] += parseFloat(coefficientSymbol+coefficient);
                    }
                    else{
                        this.polynomial[exponentSymbol+exponent] = parseFloat(coefficientSymbol+coefficient);
                    }
                 
                }
                else{
                    if(this._ifExist(this.polynomial['1'])){
                        this.polynomial['1'] += parseFloat(coefficientSymbol+coefficient);
                    }
                    else{
                        this.polynomial['1'] = parseFloat(coefficientSymbol+coefficient);
                    }
                }

                
            }
            else{
                if(this._ifExist(this.polynomial['0'])){
                    this.polynomial['0'] += parseFloat(coefficientSymbol+coefficient);
                }
                else{
                    this.polynomial['0'] = parseFloat(coefficientSymbol+coefficient);
                }
            }
                
            
          }
    }

   
    get(){
        this._sort();
        let poly ='';
        let value;
        this.exponentsOrder.forEach(key => {
            value = this.polynomial[key];
             if(value > 0){
                 poly += '+';
                 if(value !== 1 || key ==='0'){
                     poly += `${value}`; 
                 }
                 
             }
             else{
                 if(value !== -1){
                     poly += `${value}`; 
                 }
                 else{
                     poly += '-';
                 }
             }
 
             if(key !=='0'){
                 poly += 'x';
             }
             if(key !=='1' && key !=='0'){
                 poly += `^${key}`;
             }
        });
        
       return poly;
    }

    _ifExist(value){
        return typeof value !== 'undefined' ;
    }
    _ifVariableContainsCoefficient(variable){
        return /\d/.test(variable);
    }

    _sort(){
        
       this.exponentsOrder= [];

        for (const [key, value] of Object.entries(this.polynomial)) {
            this.exponentsOrder.push(key);

        }

        this.exponentsOrder.sort( (a,b) => parseFloat(b) - parseFloat(a));
    
       
       
        
    }



}

export default Polynomial;