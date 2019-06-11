import React, { Component } from "react";
import axios from "axios";

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
        <h1>Jokes</h1>
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
