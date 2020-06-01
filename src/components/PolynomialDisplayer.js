import React from 'react';
import './polynomialdisplayer.scss';

import ReactHtmlParser from 'react-html-parser'; 

class PolynomialDisplayer extends React.Component{
    regex =/\^(?=[+-]?\d+)([+-]?\d*\.?\d*)/g

 
    ifStartsPlus(value){
        return /^\+/.test(value);
    }
    convert(){
        let polynomial = this.props.polynomial;
        if(this.ifStartsPlus(polynomial)){
           
            polynomial = polynomial.slice(1,polynomial.length);
           
        }
  
       return polynomial.replace(this.regex, '<sup>$1</sup>');
    }
    render(){
        return(
            <div className="polynomial-displayer">
                {ReactHtmlParser( this.convert())}
            </div>
        );
    }
}

export default PolynomialDisplayer;