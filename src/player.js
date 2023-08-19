import React, {Component} from 'react';
import axios from "axios";
import './player.css'

class Player extends Component {
  constructor(props){
    super(props)
    this.state={
      playerName: null,
      playerStats: {}
    }
  }

handleSubmitForText = (player) => {
  player.preventDefault();
  this.getPlayerId()
  console.log(this.state.playerName)
}

handleChangeText = (event) => {
  const replace = event.target.value.split(" ").join("_");
  if(replace.length > 0){
    this.setState({playerName: replace})
  } else {
    alert("Please type players name!") // didn't enter anything
  }
}
getPlayerStats = (playerId) => {
  axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2006&player_ids[]=${playerId}`)
  .then(async res => {
    console.log(res.data.data)
    this.setState({ playerStats: res.data.data[0]})
  }).catch(err => {
    console.log(err)
  })
}
  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res => {
      // console.log(res.data.data)
      if(res.data.data[0] === undefined){ // can't find player in the api
        alert("This player hasn't played yet!")
      } else if(res.data.data.length > 1){ // more than one player with that name
        alert("Please specify more!")
      } else{
        await this.getPlayerStats(res.data.data[0].id)

      }
    }).catch(err => {
      console.log(err)
    })
  }

  
  render(){
  return (
    <div className="App">
     <form onSubmit={this.handleSubmitForText}>
       <label>
         Name
         <input 
          type="text"
          value={this.state.value}
          onChange={this.handleChangeText}
          placeholder="Enter player's name"
         />
       </label>
       <input type="submit" value="Submit"/>
     </form>
     <br />
     points averaged per game: {this.state.playerStats["pts"]}
     <br />
     rebounds averaged per game: {this.state.playerStats["reb"]}
     <br />
     assists averaged per game: {this.state.playerStats["ast"]}
    </div>
  );
}
}
export default Player;