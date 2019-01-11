import React, { Component } from 'react';

import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from '../../services/swapi-service.js'
import Row from '../row'

import './people-page.css'

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  constructor(){
    super()
    this.state=({
      selectedPerson: 3
    })
  }

  onPersonSelected = (id) => {
      this.setState({

        selectedPerson: id
      })
  }


  render(){

    const itemList = (
      <div className="col-md-6">
        <ItemList onItemSelected={this.onPersonSelected}
                  getData={this.swapiService.getAllPeople}
                  renderItem={this.props.renderItem}/>
      </div>
    )

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson}/>
    )

    return (
      <Row left={itemList} right={personDetails} />
    )
  }

}
