import React, { Component } from 'react';
import config from '../config';
import firebase from 'firebase';
import { motion } from "framer-motion";
import ScrollUpButton from "react-scroll-up-button";

class Messages extends Component {
    constructor(props) {
      super(props);
      if(!firebase.apps.length) {
        firebase.initializeApp(config);
      }
  
      this.state = {
        letters: [],
        privateLetters: [],
      };
    }
  
    componentDidMount() {
      this.getUserData();
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevState !== this.state) {
        this.writeUserData();
      }
    }
  
    writeUserData = () => {
      firebase.database()
        .ref("/")
        .set(this.state);
      console.log("DATA SAVED");
    };

    getUserData = () => {
      let ref = firebase.database().ref("/");
      ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
    
      });
    };
  
    handleSubmit = event => {
      event.preventDefault();
      let name = this.refs.name.value;
      let description = this.refs.description.value;
      let message = this.refs.message.value;
      let viewable = this.refs.viewable.value;
      let email = this.refs.email.value;
      let uid = this.refs.uid.value;
      var time = new Date().getTime();
      var date = new Date(time).toString();
  
      if (uid && name && message && viewable=="Yes") {
        const { letters } = this.state;
        const devIndex = letters.findIndex(data => {
          return data.uid === uid;
        });
        letters[devIndex].name = name;
        letters[devIndex].description = description;
        letters[devIndex].message = message;
        letters[devIndex].viewable = viewable;
        letters[devIndex].email = email;
        letters[devIndex].date = date;
        this.setState({ letters });
      } else if (name && message && viewable=="Yes") {
        const uid = new Date().getTime().toString();
        const { letters } = this.state;
        letters.push({ uid, name, description, message, viewable, email, date });
        this.setState({ letters });
      }

      if (uid && name && message && viewable=="No") {
        const { privateLetters } = this.state;
        const devIndex = privateLetters.findIndex(data => {
          return data.uid === uid;
        });
        privateLetters[devIndex].name = name;
        privateLetters[devIndex].description = description;
        privateLetters[devIndex].message = message;
        privateLetters[devIndex].viewable = viewable;
        privateLetters[devIndex].email = email;
        privateLetters[devIndex].date = date;
        this.setState({ privateLetters });
      } else if (name && message && viewable=="No") {
        const uid = new Date().getTime().toString();
        const { privateLetters } = this.state;
        privateLetters.push({ uid, name, description, message, viewable, email, date });
        this.setState({ privateLetters });
      }
  
      this.refs.name.value = "";
      this.refs.description.value = "";
      this.refs.message.value = "";
      this.refs.viewable.value = "";
      this.refs.email.value = "";
      this.refs.uid.value = "";
      this.refs.date.value = "";
      alert("Submitted Successfully!");
    };
  
    render() {
      const { letters } = this.state;
      return (
        <React.Fragment>
          <div className="container">
            <motion.div className="qform" animate={{ rotate: 360}} transition={{ durition: 2 }}>
                <h1>Talk to me, and optionally let everyone know you visited!</h1>
                <form onSubmit={this.handleSubmit}>
                  <div className>
                    <input type="hidden" ref="uid" />
                    <input type="hidden" ref="date" />
                    <div>
                      <label>What is your name?</label>
                      <input
                        type="text"
                        ref="name"
                        className="form-control"
                        minLength = {5}
                        maxLength = {20}
                        required = {true}
                      />
                    </div>
                    <div>
                      <label>Offer a short description of yourself.</label>
                      <input
                        type="text"
                        ref="description"
                        className="form-control"
                        maxLength = {100}
                        required = {false}
                      />
                    </div>
                    <div>
                      <label>What have you to say?</label>
                      <input
                        type="text"
                        ref="message"
                        className="form-control"
                        minLength = {15}
                        maxLength = {500}
                        required = {true}
                      />
                    </div>
                    <div>
                      <label>Would you like your name and meesage to be viewable by the other guests of this site?</label>
                      <select ref="viewable" required={true}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      </select>
                    </div>
                    <div>
                      <label>If you would like me to be able to contact you, what is your email? (Email will not be posted)</label>
                      <input
                        type="text"
                        ref="email"
                        className="form-control"
                        required={false}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-submit">
                    Save
                  </button>
                </form>
            </motion.div>

            <motion.div className="logs" animate={{ x: 100}} transition={{ ease: "easeIn", duration: 1 }}>
              <div>
                {letters.map(letters => (
                <div
                    key={letters.uid}
                    className="card float-left"
                    style={{ width: "20rem", marginRight: "1rem" }}
                >
                <motion.div animate= {{ rotate: 360}} transition={{ durition: 2 }}>
                    <p className="card-text-date">{letters.date}</p>
                    <h4 className="card-title">{letters.name}</h4>
                    <p className="card-text-des">{letters.description}</p>
                    <p className="card-text">&nbsp;&nbsp;&nbsp;&nbsp;{letters.message}</p>
                    <hr/>
                </motion.div>
                </div>
                ))}
              </div>
            </motion.div>
          </div>
          <ScrollUpButton />
        </React.Fragment>
      );
    }
  }

export default Messages