import React from 'react';
import PropTypes from 'prop-types';
import Train from 'material-ui/svg-icons/maps/train';
import DirectionsBus from 'material-ui/svg-icons/maps/directions-bus';
import DirectionsCar from 'material-ui/svg-icons/maps/directions-car';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

const style = {
  iconColor: 'rgb(0, 188, 212)'
};

class PathMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      path: []
    };
  }

  shouldComponentUpdate(nextProps) {
    if(this.props.shortestPath != nextProps.shortestPath) {
      nextProps.shortestPath.then(res => {
        this.setState({path: res});
      }).catch(reason => {
        throw new Error(reason);
      });

      return false;
    }

    return true;
  }

  drawMap(node, index) {
    return (
      <Step key={index}>
        <StepLabel active={true}>
          {node.from}&nbsp;
           <Train color={style.iconColor} className={(node.to.transport == 'train' ? 'show' : 'hide')}/>
           <DirectionsBus color={style.iconColor}  className={(node.to.transport == 'bus' ? 'show' : 'hide')}/>
           <DirectionsCar color={style.iconColor} className={(node.to.transport == 'car' ? 'show' : 'hide')}/>
           &nbsp;{node.to.arrival}
        </StepLabel>
        <StepContent active={true}>
          Cost: <b>&euro;{node.to.priceTotal}</b>
          <br/>
          Transport by <b>{node.to.transport}</b>
          <br/>
          Duration: <b>{node.to.duration.h}hr {node.to.duration.m}min</b>
          <br/>
          Reference: <b>{node.to.reference}</b>
        </StepContent>
      </Step>
    );
  }

  render() {
    return(
      <div>
        <Stepper orientation="vertical">
          {this.state.path.map(this.drawMap)}
        </Stepper>
      </div>
    );
  }
}

PathMap.propTypes = {
  shortestPath: PropTypes.object.isRequired
};

export default PathMap;
