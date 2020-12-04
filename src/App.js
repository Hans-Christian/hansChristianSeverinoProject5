import { Component } from 'react';
import firebase from './firebase.js'
import './styles/App.scss';
import DisplayEntries from './DisplayEntries.js'

// Add firebase modules to project. -DONE
    // configure and initialize firebase. -DONE
    // Export/import firebase. -DONE

// Display already submitted journal entries on the page in the form of a button OR link on page load. -DONE.
    // Turn journal entries into a component that will be a square page (or post-it) that contains the title and date.

// Add an entry
    // Prevent the browser from refreshing for journal entry submits. -DONE
    // Listen for a button click when the form is submitted. -DONE.
    // Clear journal entry form so that it's ready for a new entry. -DONE.

// Listen for a button click for when the user opens up an already submitted journal entry (user cannot make changes). User is allowed to read what they wrote. -NOT ADDED.
    // Grant user the option to delete their journal entry from the page if they so choose (from the database, and state). -DONE

class App extends Component{
  constructor(){
    super();
    this.state = {
      entries: [],
      startingChars:500,
      remainingChars:500
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

  // Add a character counter so the user knows how many characters they have left to type.
  charCountdown = (e) =>{
    const userInput = e.target.value;
    const charsLeft = this.state.startingChars - userInput.length;

    this.setState({
      remainingChars:charsLeft
    });
  }

  render(){
    return (
      <div className="App">

        <header>
          <div className="headerForm wrapper">
            <h1>Into the Future!</h1>

            <form action="#" onSubmit={this.submitEntry}>
              <label htmlFor="journalTitle" className="srOnly">Journal title</label>
              <input type="text" id="journalTitle" required={true} maxLength="30" placeholder="Journal entry title" ref={title => this.inputTitle = title}></input>

              <div className="journalEntry">
                <label htmlFor="journalEntry" className="srOnly">Today's journal entry:</label>
                <textarea id="journalEntry" name="journalEntry" required={true} minLength="250" maxLength="500" placeholder="What's on your mind?" cols="30" rows="10" ref={entry => this.textareaEntry = entry} onChange={this.charCountdown}></textarea>
                <p className="charCount">Characters left: {this.state.remainingChars}</p>
              </div>

              <input type="submit" className="submit" value="Submit Entry!"></input>
            </form >
          </div>
        </header>

        <main>
          <div className="entries wrapper">
            <DisplayEntries
              entries={this.state.entries}
              callback={(id) => {
                const dbRef = firebase.database().ref();
                dbRef.child(id).remove();
              }}
            />
          </div>
        </main>

        <footer>
          <div className="wrapper">
            <p> {'\u00A9'} <a href="https://github.com/Hans-Christian">Hans C. Severino</a> at <a href="https://junocollege.com/">Juno College</a> 2020 </p>
          </div>
        </footer>

      </div>
    );
  }
}

export default App;
