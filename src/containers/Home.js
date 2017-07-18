import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Home from '../components/Home';
import * as actions from '../actions/HomeActions';

export const HomePage = () => {
  return (
    <Home/>
  );
};

HomePage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
