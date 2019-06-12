import React, { Component } from "react";
import axios from "axios";
import Joke from "./Joke";
import uuid from "uuid";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props) {
    super(props);

    this.state = { jokes: JSON.parse(localStorage.getItem("jokes")) || [] };
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }

  async getJokes() {
    let jokes = [];

    while (jokes.length < this.props.numJokesToGet) {
      let response = await axios.get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json"
        }
      });

      jokes.push({ id: uuid(), joke: response.data.joke, votes: 0 });
      /* save to localstorage */
      localStorage.setItem("jokes", JSON.stringify(jokes));
    }

    this.setState({ jokes });
  }

  handleVote = (id, delta) => {
    this.setState(oldState => ({
      jokes: oldState.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }));
  };

  render() {
    return (
      <div className="JokeList">
        <div className="Jokelist_sidebar">
          <h1 className="Jokelist_title">
            <span>Funny</span> Jokes
          </h1>
          <img
            src="https://cdn0.iconfinder.com/data/icons/classic-icons/512/093.png"
            alt="app icon here"
          />
          <button className="Jokelist_getmore">Get more</button>
        </div>
        <div className="JokeList_jokes">
          {this.state.jokes.map(j => (
            <Joke
              key={j.id}
              text={j.joke}
              votes={j.votes}
              upVote={() => this.handleVote(j.id, 1)}
              downVote={() => this.handleVote(j.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
