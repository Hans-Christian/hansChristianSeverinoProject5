import { Component } from 'react';
import firebase from './firebase.js'
import './App.scss';
import DisplayEntries from './DisplayEntries.js'

// Add firebase modules to project. -DONE
    // configure and initialize firebase. -DONE
    // Export/import firebase. -DONE

// Display already submitted journal entries on the page in the form of a button OR link on page load.
    // Turn journal entries into a component that will be a square page (or post-it) that contains the title and date.

// Add an entry
    // Prevent the browser from refreshing for journal entry submits. -DONE
    // Listen for a button click when the form is submitted. -DONE.
    // Clear journal entry form so that it's ready for a new entry. -DONE.

// Listen for a button click for when the user opens up an already submitted journal entry (user cannot make changes). User is allowed to read what they wrote.
    // Grant user the option to delete their journal entry from the page if they so choose (from the database, and state).

class App extends Component{
  constructor(){
    super();
    this.state = {
      entries: []
    }
  }


  componentDidMount(){
    const dbRef = firebase.database().ref();

    // Grab data from the database.
    dbRef.on(`value`, (data) =>{
      const firebaseDataObj = data.val();

      // A new array to store the data.
      let entriesArray = [];

      for (let entry in firebaseDataObj){
        const entryObj = {
          id:entry,
          title:firebaseDataObj[entry].journalTitle,
          entry: firebaseDataObj[entry].journalEntry
        }

        entriesArray.push(entryObj);
      }

      // Store data in state property.
      this.setState({
        entries:entriesArray
      })
    })
  }


  submitEntry = (e) =>{
    e.preventDefault();

    const dbRef = firebase.database().ref();

    // Push user inputs to the database.
    const userEntry = {
      journalTitle: this.inputTitle.value,
      journalEntry: this.textareaEntry.value
    }
    dbRef.push(userEntry);

    // Clear user inputs.
    this.inputTitle.value = ``;
    this.textareaEntry.value = ``;
  }

  render(){
    return (
      <div className="App wrapper">
        <h1>Into the Future!</h1>

        <form action="#" onSubmit={this.submitEntry}>
          <label htmlFor="journalTitle" className="srOnly">Journal title</label>
          <input type="text" id="journalTitle" required={true} placeholder="Journal entry title" ref={title => this.inputTitle = title}></input>

          <div className="journalEntry">
            <label htmlFor="journalEntry" className="srOnly">Today's journal entry:</label>
            <textarea id="journalEntry" name="journalEntry" required={true} placeholder="What's on your mind?" cols="30" rows="10" ref={entry => this.textareaEntry = entry}></textarea>
          </div>

          <input type="submit" className="submit" value="Submit entry!"></input>
        </form >

        <div>
          <DisplayEntries
            entries={this.state.entries}
            callback={(id) => {
              const dbRef = firebase.database().ref();
              dbRef.child(id).remove();
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
