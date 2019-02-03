import React, { Component } from "react";
import TodoForm from "./TodoForm";
import RowTodo from "./RowTodo";
import "../index.css";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoVal: [],
      todoToShow: "all",
      toggleAllComplete: false
    };
  }

  _addTodo = todo => {
    this.setState({
      todoVal: [todo, ...this.state.todoVal]
    });
  };

  _toggleComplete = id => {
    this.setState({
      todoVal: this.state.todoVal.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return todo;
        }
      })
    });
  };

  _updateTodoShow = s => {
    this.setState({
      todoToShow: s
    });
  };

  _onDeleteTodo = id => {
    this.setState({
      todoVal: this.state.todoVal.filter(todo => todo.id !== id)
    });
  };
  _removeAllCompletedTodos = () => {
    this.setState({
      todoVal: this.state.todoVal.filter(todo => todo.complete)
    });
  };

  render() {
    let todos = [];
    if (this.state.todoToShow === "all") {
      todos = this.state.todoVal;
    } else if (this.state.todoToShow === "active") {
      todos = this.state.todoVal.filter(todo => todo.complete);
    } else if (this.state.todoToShow === "complete") {
      todos = this.state.todoVal.filter(todo => !todo.complete);
    }
    return (
      <view>
        <div>
          <TodoForm todoFormOnSubmit={this._addTodo} />
          {todos.map(todo => (
            <RowTodo
              key={todo.id}
              todo={todo}
              toggleComplete={() => {
                this._toggleComplete(todo.id);
              }}
              onDeleteTodo={() => this._onDeleteTodo(todo.id)}
            />
          ))}
        </div>
        <div className="div-total-left">
          Total todo left :
          {this.state.todoVal.filter(todo => todo.complete).length}
        </div>
        <div className="btn-show">
          <button
            onClick={() => {
              this._updateTodoShow("all");
            }}
            className="btn-submit"
            style={{ margin: ".5%", width: "9.2%" }}
          >
            ALL
          </button>
          <button
            onClick={() => this._updateTodoShow("active")}
            className="btn-submit"
            style={{ margin: ".5%", width: "9.2%" }}
          >
            ACTIVE
          </button>
          <button
            onClick={() => {
              this._updateTodoShow("complete");
            }}
            className="btn-submit"
            style={{ margin: ".5%", width: "9.2%" }}
          >
            COMPLETE
          </button>
        </div>
        <div style={{flexDirection:"column"}}>
          {this.state.todoVal.some(todo => !todo.complete) > 0 ? (
            <button
              className="btn-submit"
              style={{
                width: "29.5%",
                margin: 0,
                marginTop: ".5%",
                marginLeft: ".5%"
              }}
              onClick={this._removeAllCompletedTodos}
            >
              REMOVE ALL COMPLETES
            </button>
          ) : null}
          </div>
          <div>
          <button
            className="btn-submit"
            style={{
              width: "29.5%",
              margin: 0,
              marginTop: ".5%",
              marginLeft: ".5%"
            }}
            onClick={()=>{
                this.setState({
                    todoVal:this.state.todoVal.map(todo =>({
                        ...todo,
                        complete:this.state.toggleAllComplete
                    })),
                    toggleAllComplete:!this.state.toggleAllComplete
                })
            }}
          >
            Toggle all complete : {`${this.state.toggleAllComplete}`}
          </button>
        </div>
      </view>
    );
  }
}
