import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Search from '../components/Search';
import * as actions from '../actions/HomeActions';
import PathMap from '../components/PathMap';
import {GridList, GridTile} from 'material-ui/GridList';

export const HomePage = (props) => {
  return (
    <div style={{margin: '0 20px'}}>
      <GridList
            cols={12}
            cellHeight={'auto'}
      >
        <GridTile cols={6}>
          <Search getShortestPath={props.actions.getShortestPath}/>
          <PathMap shortestPath={props.shortestPath}/>
        </GridTile>
        <GridTile cols={6}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
