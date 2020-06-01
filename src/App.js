
import React from 'react';
import './App.scss';
import Polynomial from './classes/Polynomial';
import Result from './components/Result';
import PolynomialDisplayer from './components/PolynomialDisplayer';

class App extends React.Component{
  state={inputText: '', error: false, polynomialToValidate: "", latestPolynomial: ''}

  onChange = e => {
 
    let poly = new Polynomial(e.target.value);
    this.setState({inputText: e.target.value, error: false, polynomialToValidate: poly.get()});
  }

  formSubmit = e=>{
    e.preventDefault();
    let poly = new Polynomial(this.state.latestPolynomial);
    poly.add(this.state.inputText);
    this.setState({
      inputText: '',
      polynomialToValidate: '',
      latestPolynomial: poly.get()
    });

    if(!this.state.polynomialToValidate.length){
      this.setState({error: true});
    }
   
  }

  onReset = ()=>{
    this.setState({latestPolynomial: '', inputText: '',polynomialToValidate:''});
  }

  ifStartsDigit(value){
  
      return /^(?:\d|x)/.test(value);
  }
  render(){
    return(
      <div className="app">
        <div className="app__tutorial">
          <h2>How to use?</h2>
          <ol className="app__tutorial__list">
            <li>Type a polynomial, you can use x, x^2 or x2 convention</li>
            <li>Remember use operator (+,-)</li>
            <li>Under an input is the draft of your polynomial</li>
            <li>If everthing is okey, click "Add" - your polynomial is saved below</li>
            <li>Back to 1 and add an another part :)</li>
          </ol>
        </div>
        <form className="app__form" onSubmit={this.formSubmit}>
         <div className="app__form__input-area">
            <input type="text" onChange={this.onChange} value={this.state.inputText} className="app__form__input"/>
            <button type="submit" className="app__form__button" disabled={!this.state.inputText.length ? true : false}>Add</button>
            
          </div>
          {this.state.error ?
            <span className="error">Something wrong with your polynomial, try again!</span>
          : ''}
          {this.state.polynomialToValidate.length ?
          <div className="app__form__input-displayer">
            <span className="app__form__input-displayer__info">How your polynomial looks like:</span>
            <PolynomialDisplayer polynomial={this.state.polynomialToValidate}/>
          </div>
          
          : '' }

        
        </form>

        

        <Result result={this.state.latestPolynomial} onReset={this.onReset}/>

      </div>
      );
  }

}

export default App;
