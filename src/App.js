import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  render() {
    return(
      <div data-test="component-app">
        <h1 data-test="increment-button">The counter is currently</h1>
        <button data-test="counter-display">Increment counter</button>
      </div>
    )
  }
}

export default App;
