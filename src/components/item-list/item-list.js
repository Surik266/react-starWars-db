import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service.js'
import Spinner from '../spinner'

import './item-list.css';

export default class ItemList extends Component {

  swapiService = new SwapiService();

  constructor() {
    super()
    this.state = ({
      peopleList: null
    })
  }

  componentDidMount() {
    this.swapiService
    .getAllPeople()
    .then((peopleList) =>
    {
      this.setState({peopleList})
    })
  }

  renderItems(arr) {
    return arr.map(({id, name}) => {
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      )
    })
  }

  render(){
    const { peopleList } = this.state;

    if(!peopleList){
      return <Spinner/>
    }

    const items = this.renderItems(peopleList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}
