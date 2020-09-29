
import React, { Component } from 'react';
import axios from "axios";
import firebase from "./firebase";
import SearchBar from './SearchBar';
import FormSubmit from './FormSubmit';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      name: "",
      number: "",
      search: "",
      searchResults: [],
      image: "https:cdn2.thecatapi.com/images/6ql.gif",
      //Array("https://cdn2.thecatapi.com/images/6ql.gif",
      //"https://cdn2.thecatapi.com/images/3ln.gif",
      //"https://cdn2.thecatapi.com/images/2or.gif")
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


 
      
  handleClick = (event) => {
     event.preventDefault();
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
       console.log(response.data);

       // open portal to Firebase
       const dbRef = firebase.database().ref();
       const contacts = {
         name: this.state.name,
         number: this.state.number,
         image: this.state.image,
       };
       // add new record to Firebase
       dbRef.push(contacts);
       // reset input field
       this.setState({
         name: "",
         number: "",
       });
     });
  };

 //selectedRandomImage = () => {
 //const randomImage = image[Math.floor(Math.random() * image.length)];
//}



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
              <div>
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
                    <div>
                      
                          <img src={contact.contacts.image} alt="cat" />
                      
                        
                    </div>

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
