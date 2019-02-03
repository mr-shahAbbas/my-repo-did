import React, { Component } from "react";
import shortid from "shortid";
import "../index.css";

export default class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  _inpTextChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  _frmSubmit = event => {
    event.preventDefault();
    if (this.state.text.length > 0) {
      this.props.todoFormOnSubmit({
        id: shortid.generate(),
        text: this.state.text,
        complete: true
      });
    } else {
      // do nothing
    }
    this.setState({
      text: ""
    });
  };

  render() {
    return (
      <form className="main-form" onSubmit={this._frmSubmit}>
        <input
          name="text"
          value={this.state.text}
          onChange={this._inpTextChange.bind(this)}
          placeholder="Enter what you wish ... "
        />
        <button className="btn-submit" onClick={this._frmSubmit}>
          ADD NEW
        </button>
      </form>
    );
  }
}
