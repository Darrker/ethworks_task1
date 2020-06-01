import React from 'react';
import './result.scss';
import PolynomialDisplayer from './PolynomialDisplayer';
class Result extends React.Component{

    render(){
        return(
            <div className="result">
                <div>
                    <h4>Your polynomial: </h4>
                    <span className="result__polynomial">{this.props.result.length ?  <PolynomialDisplayer polynomial={this.props.result}/>: 'Empty' }</span>
                </div>
                {this.props.result.length ? 
                
           
                <button  
                    className="result__reset-button" 
                    onClick={e=>{
                        e.preventDefault();
                        this.props.onReset();
                    }}
                    
                    >Reset
                </button>
             
                : '' }
            </div>
        );
    }
}

export default Result;