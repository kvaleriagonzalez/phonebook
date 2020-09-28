import React, { Component } from 'react';
import './App.css';

class FormSubmit extends Component {

  

    render() {
        return (
           <div>
                <h2>Create contact</h2>
                <form action="submit">
                        <div>
                            <label forhtml="name"></label>
                        <input placeholder="Name" type="text" name="name" id="name" onChange={this.props.handleChange} value={this.props.contacts.name} required />

                            <label forhtml="number"></label>
                        <input placeholder="Cellphone Number" type="text" name="number" onChange={this.props.handleChange} value={this.props.contacts.number} required />

                            <label forhtml="Submit"></label>
                        <input onClick={this.props.handleClick} type="submit" value="New Contact" />
                        </div>
                        
                 </form>
           </div>
        )
    }
}

export default FormSubmit;