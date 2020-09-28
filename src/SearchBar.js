import React, { Component } from 'react';
import './App.css';

class SearchBar extends Component {

    render() {
        return (
            <div>
                <h2>Contact list</h2>
                <form action="" method="get">
                    <label forhtml="search"></label>
                    <input onChange={this.props.handleChange} value={this.props.contacts['']} type="text" placeholder="search contact" name="search" required/>
                    <label forhtml="Search"></label>
                    <input onClick={this.props.handleSearch} type="submit" value="search" />
                </form>
                
            </div>
           
        )
    }
}

export default SearchBar;