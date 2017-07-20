import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Search from '../components/Search';
import * as actions from '../actions/HomeActions';
import PathMap from '../components/PathMap';
import {GridList, GridTile} from 'material-ui/GridList';
import Map from '../components/Map';

export const HomePage = (props) => {
  return (
    <div style={{margin: '0 20px'}}>
      <GridList
            cols={12}
            cellHeight={'auto'}
      >
        <GridTile cols={6} style={{overflow: 'visible'}}>
          <Search getShortestPath={props.actions.getShortestPath}/>
          <PathMap shortestPath={props.shortestPath}/>
        </GridTile>
        <GridTile cols={6}>
          <Map shortestPath={props.shortestPath}/>
        </GridTile>
      </GridList>
    </div>
  );
};

HomePage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    shortestPath: state.ShortestPath
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

HomePage.propTypes = {
  shortestPath: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
