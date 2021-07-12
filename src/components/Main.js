import React, { Component } from "react";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="main-wrapper">
          <div className="text-wrapper">
            <div className="blub-wrapper-one">
              <p>yo whats up</p>
            </div>
            <div className="blub-wrapper-one">
              <p>This is a test on text</p>
            </div>
            <div className="blub-wrapper-two">
              <p>This is a test on text</p>
            </div>
            <div className="blub-wrapper-two">
              <p>This is a test on text</p>
            </div>
            <div className="blub-wrapper-one">
              <p>This is a test on text</p>
            </div>
            <div className="blub-wrapper-two">
              <p>This is a test on text</p>
            </div>
          </div>
          <div className="input-wrapper">
            <form className="input">
              <label>
                <input className="text-input" placeholder="text message" type="text" name="name"></input>
              </label>
              <input type="submit" value="Submit" />
              <input type="submit" value="save" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
