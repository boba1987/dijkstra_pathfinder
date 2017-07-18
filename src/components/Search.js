import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import 'whatwg-fetch';
import RaisedButton from 'material-ui/RaisedButton';

import injectTapEventPlugin from 'react-tap-event-plugin'; //http://www.material-ui.com/#/get-started/installation
injectTapEventPlugin();

let places = [];

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      deals: []
    };

    this.selectItems = this.selectItems.bind(this);
    this.getShortestPath = this.getShortestPath.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:9000/api')
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

  selectItems(item, index) {
    return <MenuItem value={index} primaryText={item} key={index}/>;
  }

  getShortestPath() {
    this.props.getShortestPath();
  }

  render() {
    return (
      <div>
        <h2>Trip Sorter</h2>
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
        <RaisedButton label="Search" primary={true} onTouchTap={this.getShortestPath}/>
      </div>
    );
  }
}

Search.propTypes = {
  getShortestPath: PropTypes.func.isRequired
};

export default Search;
