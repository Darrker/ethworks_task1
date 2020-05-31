import React from 'react';
import './result.scss';

class Result extends React.Component{

    render(){
        return(
            <div className="result">
                <h4>Your polynomial is:</h4>
                <span className="result__polynomial">{this.props.result}</span>
            </div>
        );
    }
}

export default Result;