import React, { Component } from "react";
import axios from "axios";
import "./JokeList.css";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props) {
    super(props);

    this.state = { jokes: [] };
  }

  async componentDidMount() {
    /* load jokes */
    let jokes = [];

    while (jokes.length < this.props.numJokesToGet) {
      let response = await axios.get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json"
        }
      });

      jokes.push(response.data.joke);
    }

    console.log(jokes);
    this.setState({ jokes });
  }

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
            <div>{j}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
