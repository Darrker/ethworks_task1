class Polynomial {
    polynomial = {};
    exponentsOrder =[];

   //regex = /([+-])(\d*\.?\d*x?)\^?([+-])?(\d*\.?\d*)/g;
    regex = /([+-])\s?(?:(?:(\d*\.?\d*x)\^([+-]?)(\d*\.?\d*))|((?:\d*\.?\d*x)|(?:\d+))|(?:x))/g;
    constructor(polynomial){

        this.add(polynomial);
    }

    add(polynomial){
        let regex = this.regex;
      
        if(/^[\d|x]/g.test(polynomial)){
            polynomial = `+${polynomial}`;
        }
        let search = regex.exec(polynomial);
        while(search){
            this._analize(search);
            search=regex.exec(polynomial)
          
        }
    }
    _analize(value){
        let coefficientSymbol = this._ifExist(value[1]) ? value[1] :  '';
        let coefficient = this._ifExist(value[2]) ? value[2] : this._ifExist(value[5]) ? value[5] : false  ;
        let exponentSymbol = this._ifExist(value[3])&& value[3] === '-' ?  value[3] : '' ;
        let exponent = this._ifExist(value[4]) ? value[4] : false ;
        if(coefficient){
          var ifCoefficientHasVariable = coefficient.includes('x'); 
          var ifVariableContainsCoefficient = /\d/.test(coefficient)
        
          if(ifCoefficientHasVariable){
      
              if(ifVariableContainsCoefficient){
                  coefficient = coefficient.slice(0,-1) ;
               }
               else{
                  coefficient = 1;
               }

               if(exponent){
                  if(this._ifExist(this.polynomial[exponentSymbol+exponent])){
                      this.polynomial[exponentSymbol+parseFloat(exponent)] += parseFloat(coefficientSymbol+coefficient);
                  }
                  else{
                      this.polynomial[exponentSymbol+parseFloat(exponent)] = parseFloat(coefficientSymbol+coefficient);
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
    
        if(/^[+]/g.test(poly)){
            poly = poly.slice(1, poly.length);
        }
       return poly;
    }
    

    _ifExist(value){
        return typeof value !== 'undefined' ;
    }
 
    _sort(){
       this.exponentsOrder= [];
        for (const [key, value] of Object.entries(this.polynomial)) {
            if(value !== 0){
                this.exponentsOrder.push(key);
            }
            else{
                delete this.polynomial[key]
            }
            

        }
        
        this.exponentsOrder.sort( (a,b) =>{
           return parseFloat(b) - parseFloat(a)
        });
    }



}



export default Polynomial;