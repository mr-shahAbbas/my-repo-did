import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import '../index.css';

export default class RowTodo extends Component {
  render() {
    let divBackground;
    this.props.todo.complete
      ? (divBackground = "#81df51")
      : (divBackground = "#fff");
    return (
      <view
        style={{
          display: "flex",
          alignItems:'center'
        }}
      >
        <div
          style={{
            width: "30%",
            padding: ".5%",
            marginBottom: 1,
            backgroundColor: divBackground
          }}
          onClick={this.props.toggleComplete}
        >
          {this.props.todo.text}
        </div>
        <DeleteIcon className="icn-delete" onClick={this.props.onDeleteTodo} />
      </view>
    );
  }
}
