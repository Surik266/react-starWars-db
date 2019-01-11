import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page'
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from '../../services/swapi-service'

import './app.css';

export default class App extends Component {

  swapiService = new SwapiService();

  constructor(){
    super()

    this.state=({
      showRandomPlanet: true,
    })

  }

  toggleRandomPlanet = () => {
      this.setState((state) => {
        return {
          showRandomPlanet: !state.showRandomPlanet
        }
      })
  }


  render(){

    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null

    return (
      <div>
        <Header/>
        {planet}

        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>

        <PeoplePage getData={this.swapiService.getAllPeople}
                    renderItem={({name,gender, birthYear}) => `${name} (${gender}, ${birthYear})` }/>

        <div className="row mb2">
            <div className="col-md-6">
              <ItemList onItemSelected={this.onPersonSelected}
                        getData={this.swapiService.getAllPlanet}
                        renderItem={(item) => item.name }/>
            </div>
            <div className="col-md-6">
              <PersonDetails personId={this.state.selectedPerson}/>
            </div>
          </div>

      <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected}
                      getData={this.swapiService.getAllStarships}
                      renderItem={(item) => item.name }/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>
    </div>
    );
  }

}
