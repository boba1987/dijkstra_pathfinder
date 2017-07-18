import React from 'react';
import 'whatwg-fetch';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    fetch('http://localhost:9000/api')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      });
  }

  render() {
    return (
      <div>
        <h2>Get Started</h2>
      </div>
    );
  }
}

export default Home;
