import React, { Component } from 'react';
import './App.css';

// FormSubmit COMPONENT
class FormSubmit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      number: "",
    };
  }
  // GET USER INPUT AND UPDATE STATE
  handleChange = (event) => {
    event.preventDefault();
    document.getElementById("error").textContent = "";

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      //WHEN USER PUT INPUT / DISPLAY INFORMATION IN RENDER
      <div>
        <h2>Create contact</h2>
        <p id="error"></p>
        <form action="submit">
          <label forhtml="name"></label>
          <input
            placeholder="Name"
            type="text"
            name="name"
            id="name"
            onChange={this.handleChange}
            value={this.state.name}
          />

          <label forhtml="number"></label>
          <input
            placeholder="Cellphone Number"
            type="text"
            name="number"
            id="number"
            onChange={this.handleChange}
            value={this.state.number}
          />

          <label forhtml="Submit"></label>
          <input
            onClick={(event) =>
              this.props.handleClick(event, this.state.name, this.state.number)
            }
            type="submit"
            value="New Contact"
          />
        </form>
        <p class="text-info">only 3 contact will be display</p>
      </div>
    );
  }
}

export default FormSubmit;