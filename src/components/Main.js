import React, { Component } from "react";
import socketIOClient from "socket.io-client";
const baseUrl = process.env.REACT_APP_BASE_URL;
const extension = process.env.REACT_APP_EXTENSION;
const socket = socketIOClient(`${baseUrl}/${extension}`);

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joined: [],
      value: "",
      username: "",
      offline: [],
      fakeObject: [{ username: "anony", message: "welcome to the chat room" }],
    };
  }
  // message and username

  

  componentDidMount() {
    socket.on("messageOut", (sender) => {
      console.log("messageOut", sender);
      this.setState({ fakeObject: [...this.state.fakeObject, sender] });
    });

    socket.on("stringOut", (sender) => {
      console.log("stringOUt", sender);
      this.setState({ joined: [...this.state.joined, sender] });
    });

    socket.on("initialLogin", (sender) => {
      console.log("inside of initialLogijn", sender);
      this.setState({ offline: sender.storedMessages });
    });
  }

  // on submit - socket.emit - username and message
  send(e) {
    e.preventDefault();
    socket.emit("message", {
      username: this.state.username,
      message: this.state.value,
    });
   
  }
  
 
  userName(e) {
    e.preventDefault();
    socket.emit("initialLogin", { username: this.state.username });
    this.setState({ boolean: true });
    // console.log("username", this.state.username);
  }

  render() {
    // console.log("Joined array", this.state.joined);
    return (
      <div className="container">
        <div className="main-wrapper">
          <div className="text-wrapper">
            {this.state.fakeObject.map((messages, idx) => (
              <div className="blub-wrapper-one" key={idx}>
                <p>
                  {messages.username}: {messages.message}
                </p>
              </div>
            ))}

            {this.state.joined.map((messages, idx) => (
              <div className="blub-wrapper-two" key={idx}>
                <p>{messages}</p>
              </div>
            ))}

            {this.state.offline.map((messages, idx) => (
              <div className="blub-wrapper-two" key={idx}>
                <p>{messages.message}</p>
              </div>
            ))}
          </div>

          <div className="input-wrapper">
            <form className="input">
              <input
                onChange={(e) => this.setState({ value: e.target.value })}
                className="text-input"
                placeholder="text message"
                type="text"
                name="message"
              ></input>

              <input
                className="button6"
                onClick={(e) => this.send(e)}
                type="submit"
              />
            </form>
          </div>
        </div>
        <div className="input-wrapper2">
          <form className="input">
            <input
              onChange={(e) => this.setState({ username: e.target.value })}
              className="text-input"
              placeholder="Input User"
              type="text"
              name="name"
            ></input>

            <input
              className="button6"
              onClick={(e) => this.userName(e)}
              type="submit"
            />
          </form>
        </div>
      </div>
    );
  }
}
