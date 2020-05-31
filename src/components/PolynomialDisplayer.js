import React,{Fragment} from 'react';
import './polynomialdisplayer.scss';

import ReactHtmlParser from 'react-html-parser'; 

class PolynomialDisplayer extends React.Component{
    regex =/\^(?=[+-]?\d+)([+-]?\d*\.?\d*)/g


    convert(){
      
  
       return this.props.polynomial.replace(this.regex, '<sup>$1</sup>');
    }
    render(){
        return(
            <div className="polynomial-displayer">
                <p>{ReactHtmlParser( this.convert())}</p>
            </div>
        );
    }
}

export default PolynomialDisplayer;