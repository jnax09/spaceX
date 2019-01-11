import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import logo from './logo.png';
import Launches from './component/Launches';
import Launch from './component/Launch';

const client = new ApolloClient({
  uri: '/graphql'
});

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="container">
            <img
              src={logo}
              alt="logo"
              style={{
                width: 300,
                margin: 'auto',
                display: 'block'
              }}
            />
            <div>
              <Route exact path="/" component={Launches} />
              <Route exact path="/launch/:flight_number" component={Launch} />
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
