
import React, { Component } from 'react';
import axios from "axios";
import firebase from "./firebase";
import SearchBar from './SearchBar';
import FormSubmit from './FormSubmit';
import './App.css';

//APP COMPONENT
class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      name: "",
      number: "",
      search: "",
      searchResults: [],
    };
  }

  componentDidMount() {
    // CREATE A FIREBASE REFERENCE
    const dbRef = firebase.database().ref();

    dbRef.on("value", (response) => {
      const newState = [];
      const data = response.val();
      // CREATE KEY
      for (const key in data) {
        newState.push({
          key: key,
          contacts: data[key],
        });
      }
      //UPDATING REACT INPUT
      this.setState({
        contacts: newState,
      });
    });
  }

  //GET USER INPUT AND UPDATE STATE
  handleChange = (event) => {
   event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
   };

  //HANDLE CLICK FUNCTION / GETTING API DATA
  handleClick = (event,name,number) => {
    event.preventDefault();
   if (name === "" || number === "")  {
        //alert("please fill in the blanks ");
        document.getElementById('error').textContent = 'please fill in the blanks';
        
        } else { 
          

     axios({
       url:
         "https://api.thecatapi.com/v1/images/search/?api_key=85887931-8d04-4f23-a9fd-380b976e7e87&mime_types=gif",
       method: "GET",
       responseType: "JSON",
       params: {
         key: "85887931-8d04-4f23-a9fd-380b976e7e87",
         mime_types: "gif",
       },
     }).then((response) => {
       //STORE URL IN VARIABLE
       const picture = response.data[0].url;

       // OPEN PORTAL TO FIREBASE
       const dbRef = firebase.database().ref();
       const contacts = {
         name: name,
         number: number,
         image: picture,
       };
       // ADD NEW RECORD TO FIREBASE
       dbRef.push(contacts);

       // // RESET INPUT FIELD WHEN FORM IS SUBMITTED
       // this.setState({
       //   name: "",
       //   number: "",
       //});
     });
    }
  };
  
  // DELETE SELECTED USER FROM FIREBASE
  handleRemove = (contactDelete) => {
    const dbRef = firebase.database().ref();
    dbRef.child(contactDelete).remove();
  };

  //HANDLE SEARCH
  handleSearch = (event) => {
    event.preventDefault();
    // MATCHING CONTACT WHEN USER CLICK SEARCH
    const results = this.state.contacts.filter((item) => {
      return item.contacts.name === this.state.search;
    });
    console.log(results);
    this.setState({
      search: "",
      searchResults: results,
    });
  };

  //RENDER = HTML
  render() {
    return (
      <header>
        <div className="wrapper">
          <h1>My PhoneBook</h1>
          <div className="wrapper flex">
            <div className="add-contact">
              <FormSubmit
                handleChange={this.handleChange}
                contacts={this.state.contacts}
                name={this.state.name}
                number={this.state.number}
                handleClick={this.handleClick}
              />
                <ul>
                {
                  //CONTACT WILL BE DISPLAY

                  this.state.contacts.map((contact, index) => {
                    if (index > 2) {
                      return null;
                    }

                    return (
                      <li key={contact.key}>
                        <p>
                          <span>Name:</span> {contact.contacts.name}
                          <span> Number: </span>
                          {contact.contacts.number}
                          {/* CONTACT WILL BE DELETE WHEN USER CLICK BUTTON */}
                          <i class="fas fa-trash" onClick={() => this.handleRemove(contact.key)}>
                            {" "}
                          </i>
                        </p>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
            <div className="search">
            {/* SEARCH COMPONENT WILL DISPLAY HERE */}
            <SearchBar
              handleChange={this.handleChange}
              contacts={this.state.contacts}
              handleSearch={this.handleSearch}
            />
              <ul>
                {
                  // WHEN USER CLICK SEARCH CONTACT STORED IN FIREBASE WILL BE DISPLAY HERE WITH A IMAGE USE FROM API
                  this.state.searchResults.map((contact) => {
                    return (
                      <li key={contact.key}>
                        <p>
                          <span>Name:</span> {contact.contacts.name}
                          <span> Number: </span>
                          {contact.contacts.number}
                        </p>
                        <div>
                          <img src={contact.contacts.image} alt="cat" />
                        </div>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default App;

 
  
