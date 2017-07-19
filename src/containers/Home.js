import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Search from '../components/Search';
import * as actions from '../actions/HomeActions';
import PathMap from '../components/PathMap';

export const HomePage = (props) => {
  return (
    <div>
      <Search getShortestPath={props.actions.getShortestPath}/>
      <PathMap shortestPath={props.shortestPath}/>
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
