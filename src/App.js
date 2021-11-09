import React from "react";
import Form from "./Form";
import ResultSection from './ResultSection'
import "./App.css";

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      result: '',
    }
  }

  printResult = (result) => {
    this.setState({result: result})
  }

  render() {
    return (
      <main>
        <p>Enter each number in the array, separated by a ','</p>
        <Form
          name='Coolculator'
          afterSubmit={this.printResult}
        />
        <ResultSection result={this.state.result} />
      </main>
    );
  }
}

export default App;
