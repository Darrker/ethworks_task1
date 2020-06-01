

class Polynomial {
    polynomial = {};
    exponentsOrder =[];

   regex = /([+-])\s?(\d*\.?\d*x?)\^?([+-])?\s?(\d*\.?\d*)/g;
    constructor(polynomial){

        this.add(polynomial);
    }

    add(polynomial){
        let regex = this.regex;
        let search;
        if(/^[\d|x]/g.test(polynomial)){
            polynomial = `+${polynomial}`;
        }
        while(search=regex.exec(polynomial)){
            this._analize(search);
          
        }
    }
    _analize(value){
          let coefficientSymbol = this._ifNotExist(value[1]) ? value[1] :  '';
          let coefficient = this._ifNotExist(value[2]) ? value[2] : false ;
          let exponentSymbol = this._ifNotExist(value[3])&& value[3] === '-' ?  value[3] : '' ;
          let exponent = this._ifNotExist(value[4]) ? value[4] : false ;
        
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
                    if(this._ifNotExist(this.polynomial[exponentSymbol+exponent])){
                        this.polynomial[exponentSymbol+exponent] += parseFloat(coefficientSymbol+coefficient);
                    }
                    else{
                        this.polynomial[exponentSymbol+exponent] = parseFloat(coefficientSymbol+coefficient);
                    }
                 
                }
                else{
                    if(this._ifNotExist(this.polynomial['1'])){
                        this.polynomial['1'] += parseFloat(coefficientSymbol+coefficient);
                    }
                    else{
                        this.polynomial['1'] = parseFloat(coefficientSymbol+coefficient);
                    }
                }

                
            }
            else{
                if(this._ifNotExist(this.polynomial['0'])){
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
    

    _ifNotExist(value){
        return typeof value !== 'undefined' ;
    }
    _ifVariableContainsCoefficient(variable){
        return /\d/.test(variable);
    }

    _sort(){
       this.exponentsOrder= [];

        for (const [key, value] of Object.entries(this.polynomial)) {
            if(value === 0){
                delete this.polynomial[key];
                return;
            }
            this.exponentsOrder.push(key);

        }

        this.exponentsOrder.sort( (a,b) =>{
           return parseFloat(b) - parseFloat(a)
        });
    }



}



export default Polynomial;