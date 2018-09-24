import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TickerContainer, CurrentScore, TeamName, DateTime, Icon, AnchorButton } from './Ticker.styles';
import { CentricContainer } from '../../shared/styles';

const CLIENT_URL = 'https://www.unibet.com/betting#/event/live/';

class Ticker extends Component {
  render() {
    return (
      <TickerContainer>
        <CurrentScore>{this.getScore()}</CurrentScore>

        <CentricContainer>
          <Icon className={this.props.match.sportType.toLowerCase()}></Icon>
          <TeamName>{this.props.match.name}</TeamName>
        </CentricContainer>

        <DateTime>{this.getDateTime()}</DateTime>

        <AnchorButton href={CLIENT_URL + this.props.match.eventId}>
          Place a bet
        </AnchorButton>
      </TickerContainer>
    );
  }

  /**
   * If the given time is todays time then it returns 'Today, Local Time String'
   * else it returns 'Local Date String, Local Time String'.
   */
  getDateTime() {
    const currentDate = new Date();
    const date = new Date(this.props.match.startDateTime);
    const time = date.toLocaleTimeString().substr(0, 5);
    if (currentDate.toLocaleDateString() === date.toLocaleDateString()) {
      return `Today, ${time}`;
    } else {
      return `${date.toLocaleDateString()}, ${time}`;
    }
  }

  /**
   * Gets the score information and returns it in below format:
   * [Home Team Score - Away Team Score].
   * In case score is not provided it returns 0 - 0.
   */
  getScore() {
    const score = this.props.match.score;
    if (!score) return '0 - 0';

    return `${score.home} - ${score.away}`;
  }
}

Ticker.propTypes = {
  match: PropTypes.shape({
    name: PropTypes.string,
    startDateTime: PropTypes.string,
    sportType: PropTypes.string,
    score: PropTypes.any,
    eventId: PropTypes.number
  })
};

export default Ticker;
