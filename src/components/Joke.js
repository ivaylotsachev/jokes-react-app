import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  getColor() {
    let { votes } = this.props;

    if (votes >= 15) return "#4acf50";
    else if (votes >= 12) return "#8bc34a";
    else if (votes >= 9) return "#cddc39";
    else if (votes >= 6) return "#ffeb3b";
    else if (votes >= 3) return "#ffc107";
    else if (votes >= 0) return "#ff9800";
    else return "#f44336";
  }

  getEmoji() {
    let { votes } = this.props;

    if (votes >= 15) return "em em-rolling_on_the_floor_laughing";
    else if (votes >= 12) return "em em-laughing";
    else if (votes >= 9) return "em em-smiley";
    else if (votes >= 6) return "em em-slightly_smiling_face";
    else if (votes >= 3) return "em em-neutral_face";
    else if (votes >= 0) return "em em-confused";
    else return "em em-angry";
  }

  render() {
    return (
      <div className="Joke">
        <div className="Joke_buttons">
          <i className="fas fa-arrow-up" onClick={this.props.upVote} />
          <span
            className="Joke_votes"
            style={{
              borderColor: this.getColor()
            }}
          >
            {this.props.votes}
          </span>
          <i className="fas fa-arrow-down" onClick={this.props.downVote} />
        </div>
        <div className="Joke_text">{this.props.text}</div>
        <div className="Joke_smiley">
          <i class={this.getEmoji()} />
        </div>
      </div>
    );
  }
}

export default Joke;
