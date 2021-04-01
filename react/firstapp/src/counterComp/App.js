import './App.css';

import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,

    }
  }

  plusCounter = () => {
    this.setState((prevState) => {
      return { counter:prevState.counter+1 }
    })
   }

   minusCounter = () => {
    this.setState((prevState) => {
      return { counter:prevState.counter-1 }
    })
   }

  render() {
    return(
    <div>
      <div>{this.state.counter}</div>
      <Button onClick={this.plusCounter}>Добавить</Button>
      <Button onClick={this.minusCounter}>Убавить</Button>
    </div>
    )
  };
}

class Button extends React.Component {
  render(props) {
    return <button onClick={this.props.onClick}>{this.props.children}</button>
  }
}



export default Counter