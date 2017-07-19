import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import 'whatwg-fetch';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import injectTapEventPlugin from 'react-tap-event-plugin'; //http://www.material-ui.com/#/get-started/installation
injectTapEventPlugin();

let places = [];

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      deals: [],
      validationError: '',
      criteria: 'priceTotal'
    };

    this.selectItems = this.selectItems.bind(this);
    this.getShortestPath = this.getShortestPath.bind(this);
    this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
  }

  componentDidMount() {
    fetch('https://sleepy-dusk-47536.herokuapp.com/api')
      .then(response => {
        return response.json();
      })
      .then(data => {
        data.deals.map(item => {
          if (places.indexOf(item.departure) == -1 ) {
            places.push(item.departure);
          }
        });
        this.setState({deals: data.deals});
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.criteria != this.state.criteria) {
      return false;
    }

    return true;
  }

  selectItems(item, index) {
    return <MenuItem value={index} primaryText={item} key={index}/>;
  }

  getShortestPath() {
    if (this.state.from != undefined && this.state.to != undefined) {
      if (this.state.from == this.state.to) {
        this.setState({validationError: 'Please, select different destinations.'});
        return;
      }
      this.setState({validationError: ''});
      this.props.getShortestPath(this.state.deals, places[this.state.from], places[this.state.to], this.state.criteria);
      return;
    }

    this.setState({validationError: 'Please, select both destinations.'});
  }

  handleCriteriaChange(event, value) {
    this.setState({criteria: value});
  }

  render() {
    return (
      <div>
        <SelectField
          onChange={(event, index, value) => this.setState({from: value})}
          floatingLabelText="From"
          value={this.state.from}
        >
          {places.map(this.selectItems)}
        </SelectField>
        &nbsp;
        <SelectField
          onChange={(event, index, value) => this.setState({to: value})}
          floatingLabelText="To"
          value={this.state.to}
        >
          {places.map(this.selectItems)}
        </SelectField>
        <br/>
        <RadioButtonGroup name="criteria" defaultSelected="priceTotal" onChange={this.handleCriteriaChange}>
          <RadioButton
            value="priceTotal"
            label="Cheapest"
          />
          <RadioButton
            value="durationMinutes"
            label="Fastest"
          />
        </RadioButtonGroup>
        <br/>
        <RaisedButton label="Search" primary={true} onTouchTap={this.getShortestPath}/>
        &nbsp;&nbsp;
        <span>
          {this.state.validationError}
        </span>
      </div>
    );
  }
}

Search.propTypes = {
  getShortestPath: PropTypes.func.isRequired
};

export default Search;
