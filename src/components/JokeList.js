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

    this.state = {
      jokes: JSON.parse(localStorage.getItem("jokes")) || [],
      isLoading: false
    };

    this.seenJokes = new Set(this.state.jokes.map(j => j.text));
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }

  async getJokes() {
    try {
      let jokes = [];

      while (jokes.length < this.props.numJokesToGet) {
        let response = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" }
        });

        let newJoke = response.data.joke;

        if (!this.seenJokes.has(newJoke)) {
          jokes.push({ id: uuid(), joke: newJoke, votes: 0 });
        }
      }

      this.setState(
        st => ({
          isLoading: false,
          jokes: [...st.jokes, ...jokes]
        }),
        () => localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }

  handleVote = (id, delta) => {
    this.setState(
      oldState => ({
        jokes: oldState.jokes.map(j =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        )
      }),
      () => localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  };

  handleClick = () => {
    this.setState({ isLoading: true }, () => this.getJokes());
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1>Loading...</h1>
        </div>
      );
    } else {
      let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);

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
            <button className="Jokelist_getmore" onClick={this.handleClick}>
              Get more
            </button>
          </div>
          <div className="JokeList_jokes">
            {jokes.map(j => (
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
}

export default JokeList;
