import React from "react";
import "./Form.css";

class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      values: '',
      operation: '',
      textInputHasError: false,
      selectHasError: false,
    }
  }

  handleInputChange = (event) => {
    this.setState({values: event.target.value})
  }

  handleSelectChange = (event) => {
    this.setState({operation: event.target.value})
  }

  // or, instead of the two methods above, you could use this one weird trick and make this one the onChange for both!
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {values, operation} = this.state
    if (values === '') {
      this.setState({textInputHasError: true})
    } else {
      this.setState({textInputHasError: false})
    }


    if (operation === 'sum') {
      const nums = values.split(',').map(Number)
      let sum = 0;
      nums.forEach((num) => sum += num)
      this.props.afterSubmit(sum)
      this.setState({selectHasError: false})
    } else if (operation === 'average') {
      const nums = values.split(',').map(Number)
      let sum = 0;
      nums.forEach((num) => sum += num)
      this.props.afterSubmit(sum / nums.length)
      this.setState({selectHasError: false})
    } else if (operation === 'mode') {
      // do mode stuff
      const nums = values.split(',').map(Number)
      let answer = nums[0]
      const counts = {};
      nums.forEach((num) => {
        if (counts[num]) {
          counts[num]++;
        } else {
          counts[num] = 1;
        }
      })

      Object.keys(counts).forEach((key) => {
        if (counts[key] > counts[answer]) {
          answer = key;
        }
      })

      this.props.afterSubmit(answer)
      this.setState({selectHasError: false})
    } else {
      this.setState({selectHasError: true})
    }
  }

  render() {
    return (
      <form>
        <label htmlFor='values'>{this.props.name}</label>
        <input
          id="values"
          name="values"
          type="text"
          value={this.state.values}
          onChange={this.handleInputChange}
          className={this.state.textInputHasError ? 'error' : ''}
        />

        <p>{this.state.textInputHasError && 'Invalid input.'}</p>

        <select
          id="operation"
          name="operation"
          onChange={this.handleSelectChange}
          className={this.state.selectHasError ? 'error' : ''}
        >
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <p>{this.state.selectHasError && 'Please make a selection.'}</p>
        <button type="submit" onClick={this.handleSubmit}>Calculate</button>
      </form>
    );
  }
}

export default Form;
