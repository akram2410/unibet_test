import React, { Component } from 'react';
import Ticker from './components/ticker/Ticker';
import Carousel from './shared/components/carousel/Carousel';
import LoadingIndicator from './shared/components/loading_indicator/loading_indicator';
import Service from './App.service';

class App extends Component {
  state = {
    matches: [],
    dataLoaded: false,
    errorMessage: ''
  }

  async componentDidMount() {
    this.setState(await Service.requestMatchesData());
  }

  render() {
    if (this.state.dataLoaded && !this.state.errorMessage) {
      return (
        <Carousel>
          {this.state.matches.map(
            match => <Ticker key={match.eventId} match={match}></Ticker>)}
        </Carousel>
      );
    } else {
      return <LoadingIndicator errorMessage={this.state.errorMessage} />;
    }
  }
}
export default App;
