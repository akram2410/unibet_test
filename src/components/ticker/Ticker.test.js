import { shallow } from 'enzyme';
import Ticker from './Ticker';
import React from 'react';
import '../../setUpTests';
import { TickerContainer, CurrentScore, TeamName, DateTime, AnchorButton, Icon } from './Ticker.styles';

describe('Ticker', () => {
  it('should render all the children', () => {
    const startDateTime = new Date().toDateString().substr(4) + ' 14: 30';
    const date = new Date(startDateTime);
    const match = {
      name: 'Test Home Team - Test Away Team',
      startDateTime,
      sportType: 'No Specified Sport',
      score: { home: 12, away: 89 },
      eventId: 12345
    };
    const wrapper = shallow(<Ticker match={match} />);
    let element = wrapper.find(TickerContainer);
    expect(element.children().length).toBe(4);
    element = wrapper.find(CurrentScore);
    expect(element.html()).toContain('12 - 89');
    element = wrapper.find(TeamName);
    expect(element.html()).toContain('Test Home Team - Test Away Team');
    element = wrapper.find(DateTime);
    const expectedTime = date.toLocaleTimeString().substr(0, 5);
    expect(element.html()).toContain('Today, ' + expectedTime);
    element = wrapper.find(AnchorButton);
    expect(element.prop('href')).toEqual(
      'https://www.unibet.com/betting#/event/live/12345'
    );
    expect(element.html()).toContain('Place a bet');
    wrapper.unmount();
  });

  it('should render the 0 - 0 score when no score is provided', () => {
    const startDateTime = new Date().toDateString().substr(4) + ' 14: 30';
    const match = {
      name: 'Test Home Team - Test Away Team',
      startDateTime,
      sportType: 'No Specified Sport',
      eventId: 12345
    };
    const wrapper = shallow(<Ticker match={match} />);
    let element = wrapper.find(CurrentScore);
    expect(element.html()).toContain('0 - 0');
  });

  it('should render date properly when today date is not given', () => {
    const startDateTime = '2013-05-08 14: 30';
    const date = new Date(startDateTime);
    const match = {
      name: 'Test Home Team - Test Away Team',
      startDateTime,
      sportType: 'No Specified Sport',
      eventId: 12345
    };
    const wrapper = shallow(<Ticker match={match} />);
    let element = wrapper.find(DateTime);
    const expectedDate = date.toLocaleDateString() + ', ' +
      date.toLocaleTimeString().substr(0, 5);
    expect(element.html()).toContain(expectedDate);
  });
});
