import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'

import './random-planet.css';

export default class RandomPlanet extends Component {

  SwapiService = new SwapiService();

  constructor() {
    super();
    this.state = {
      planet : {},
      loading: true,
      error: false
    };
  }

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval (this.updatePlanet,2500)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onError = (err) => {
      this.setState({
        loading: false,
        error: true
      })
  }


  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading:false,
      error: false
     });
  }
  updatePlanet = () => {
      const id = Math.floor(Math.random()*18) + 1;
      this.SwapiService.getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
  }

  render() {

    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = hasData ?  <PlanetView planet={ planet }/> : null;

    return (
      <div className="random-planet jumbotron rounded">
          {errorMessage}
          {content}
          {spinner}
      </div>

    );
  }
}

const PlanetView = ({ planet }) => {
  const { population, rotationPeriod, diameter, name, id} = planet;
  return (
    <React.Fragment>
      <img className="planet-image" alt="planet"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}
