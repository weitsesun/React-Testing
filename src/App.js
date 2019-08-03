import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      error: false,
    }
  }

  render() {
    return(
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {this.state.counter}
        </h1>
        {counterAlarm(this.state.error)}
        <button data-test="increment-button" 
        onClick={
          () => {
            this.setState({counter: this.state.counter + 1, 
              error: false}
            )}}
            >
          Increment counter
        </button>
        <button data-test="decrement-button" onClick={() => {
          let result = this.state.counter - 1;
          if(result < 0) {
            this.setState({error: true});
            result = 0;
          } else {
            this.setState({error: false})
          }

          this.setState({
            counter: result
          })}
          }>Decremet Button</button>
      </div>
    )
  }
}

export default App;

const counterAlarm = function(input) {
  return input ? <h2 data-test="error-message">Error: The counter cannot be less than zero!</h2> : <l></l>
}