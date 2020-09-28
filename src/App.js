
import React, { Component } from 'react';
import firebase from "./firebase";
import SearchBar from './SearchBar';
import FormSubmit from './FormSubmit';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts : [],
      name : "",
      number : "",
      search : "",
      searchResults: [],
    };
  }

  componentDidMount() {

    // create a Firebase reference
    const dbRef = firebase.database().ref();
  
    dbRef.on("value", (response) => {
    const newState =[];
    const data = response.val();

    for (const key in data) {
      newState.push({
        key: key,
        contacts: data[key]
      });
    }
    // update our React state 
    this.setState({
      contacts: newState,
    });
  });
  }

  // get user input and update the userInput state
  handleChange = (event) => {
    event.preventDefault();
    //console.log(event.target.value);  // user input data
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // stop refreshing my page
  // take user input and store in Firebase
  // reset input field
  handleClick = (event) => {
    event.preventDefault();
    // open portal to Firebase
    const dbRef = firebase.database().ref();
    const contacts = {
      name : this.state.name,
      number: this.state.number,
    }
    // add new record to Firebase
    dbRef.push(contacts);
    // reset input field
    this.setState({
      name: "",
      number: "",
    });
  };

 
  // delete that specific contact from Firebase
  handleRemove = (contactDelete) => {
   // console.log(contactDelete);
    // open portal to Firebase
    const dbRef = firebase.database().ref();
    // delete the book based on bookKey
    dbRef.child(contactDelete).remove();
  };

  handleSearch = (event) => {
    event.preventDefault();

// this.state.search is the state that we want to look for / inside search contact[]
   const results = this.state.contacts.filter((item) => {
    return item.contacts.name === this.state.search

   })
    console.log(results)
    this.setState({
      search: "",
      searchResults: results
    })
  
  }

  render() {
    return (
      <header>
        <div className="wrapper">
            <h1>My PhoneBook</h1>
              <div className="flex">
              <FormSubmit handleChange = {this.handleChange} contacts = {this.state.contacts} handleClick = {this.handleClick} />
              
              </div>  
              <ul>
                {
                  // display  here
                  this.state.contacts.map((contact,index) => { if (index > 2) {
                    return null
                  }

                    return (
                      <li key={contact.key}>
                        <p>
                          <span>Name:</span> {contact.contacts.name}<span> Number: </span>{contact.contacts.number}
                          <button onClick={() => this.handleRemove(contact.key)}> delete</button>
                        </p>
                        {/* button to delete contact */}
                        
                      </li>
                    );
                  })
                }
            </ul>
          <SearchBar handleChange={this.handleChange} contacts={this.state.contacts} handleSearch={this.handleSearch}/>
          <ul>
            {
              // display  here
              this.state.searchResults.map((contact) => {
                return (
                  <li key={contact.key}>
                    <p>
                      <span>Name:</span> {contact.contacts.name}<span> Number: </span>{contact.contacts.number}
                      
                    </p>
                    {/* button to delete contact */}

                  </li>
                );
              })
            }
          </ul>

        </div>
      </header>
    );
  }
}

export default App;
