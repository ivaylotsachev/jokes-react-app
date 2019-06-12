import React, { Component } from "react";

class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <div className="Joke_buttons">
          <i className="fas fa-arrow-up" onClick={this.props.upVote} />
          <span>{this.props.votes}</span>
          <i className="fas fa-arrow-down" onClick={this.props.downVote} />
        </div>
        <div className="Joke_text">{this.props.text}</div>
      </div>
    );
  }
}

export default Joke;
