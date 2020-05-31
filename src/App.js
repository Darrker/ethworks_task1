
import React from 'react';
import './App.scss';
import Polynomial from './classes/Polynomial';
import Result from './components/Result';
import PolynomialDisplayer from './components/PolynomialDisplayer';

class App extends React.Component{
  state={inputText: '', regex:'', result: ''}

  onChange = e => {
    let poly = new Polynomial(e.target.value);
    this.setState({inputText: e.target.value, result: poly.get()});
  }

  formSubmit = e=>{
    e.preventDefault();
  }
  render(){
    return(
      <div className="app">
        <form className="app__form" onSubmit={this.formSubmit}>
         <div className="app__form__input-area">
            <input type="text" onChange={this.onChange} value={this.state.inputText} className="app__form__input"/>
            <button type="submit" className="app__form__button">Add</button>
            
          </div>
            <PolynomialDisplayer polynomial={this.state.result}/>

        
        </form>

        

        {/* <Result result={this.state.result}/> */}

      </div>
      );
  }

}

export default App;
