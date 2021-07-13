import React, { Component } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";
const socket = socketIOClient(ENDPOINT)

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender: {},
      value: '',
      fakeObject: [{"username":"fakeusername","message":"fakeMessage"},{"username":"fakeusername","message":"fakeMessage"},{"username":"fakeusername","message":"fakeMessage"}]
    };
    
  }
  // message and username
  

  // update state with newobject
  showObject(){
    const newObject = {key: {"username":"fakeusername","message":"fakeMessage"}}
    this.state.fakeObject.push(newObject);
    console.log(this.state.fakeObject)
  }


  componentDidMount(){
    socket.on("listening", (sender) => {
      this.setState({ sender: sender})
    })
  }

    // on submit - socket.emit - username and message
  send(){
    socket.emit("message", this.state.value)
  }

  render() {
    return (
      <div>
        <div className="main-wrapper">
          <div className="text-wrapper">
            {this.state.fakeObject.map((messages, idx) => (
              <div className="blub-wrapper-one" key={idx}>
                <div className="blub-wrapper-one">
                  <p>this is a test</p>
                </div>
              </div>
          ))}
            <div className="blub-wrapper-one">
              
              <p>this is a test</p>
            </div>
            <div className="blub-wrapper-one">
              <p>This is a test on text</p>
            </div>
            <div className="blub-wrapper-two">
              <p>This is a test on text</p>
            </div>
            <div className="blub-wrapper-two">
              <p>does it blend</p>
            </div>
            <div className="blub-wrapper-one">
              <p>wrapper one is grey</p>
            </div>
            <div className="blub-wrapper-two">
              <p>This is a test on text</p>
            </div>
          </div>
          <div className="input-wrapper">
            <form className="input">
              <label>
                <input onChange={(e) => this.setState({ value: e.target.value })} className="text-input" placeholder="text message" type="text" name="name"></input>
              </label>
              <input onClick={() => this.send()} type="submit" value="Send" />
              <input type="submit" value="save" />
            </form>
            <button onClick={() => this.showObject()}>here</button>
          </div>
        </div>
      </div>
    );
  }
}
