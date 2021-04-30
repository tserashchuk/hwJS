import React from "react";
import "./App.css";

const generateArr = (a) => {
  return Array.from({ length: a }, (_, k) => k);
};

let arrOfDigits = generateArr(10);

const template = {
  type: "",
  value: "",
};

class Calculator extends React.Component {
  state = {
    arr: [
      { value: 1, type: "digit" },
      { value: 0, type: "digit" },
      { value: "=", type: "equals" },
      { value: "+", type: "action" },
    ],
    action: '',
    inputValue: "",
    pushedButton: [],
  };

  handleClick = (item) => {
    this.handleChangeInput(item.value);
    item.type !== "equals"
      ? this.setState((prevState) => ({
          pushedButton: prevState.pushedButton[prevState.pushedButton.length - 1].type === 'digit' || item.type === 'digit' ? [] : [...prevState.pushedButton, item],
        }))
      : this.handleCalculate();
  };

  handleCalculate = () => {
    this.state.pushedButton.forEach((item, index, arr) => {
      if (item.type === "action") {
        this.sum(arr[index - 1].value, arr[index + 1].value);
      }
    });
  };

  sum = (value1, value2) => {
    console.log(value1 + value2);
  };

  handleChangeInput = (value) => {
    this.setState((prevState) => ({
      inputValue: `${prevState.inputValue}${value}`,
    }));
  };

  render() {
    return (
      <>
        <input
          type="text"
          className="input"
          readOnly="readonly"
          value={this.state.inputValue}
        />
        <div className="calendar-wrapper">
          {this.state.arr.map((item, index) => {
            return (
              <input
                className="flex-item"
                type="button"
                onClick={() => this.handleClick(item)}
                key={index}
                value={item.value}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default Calculator;