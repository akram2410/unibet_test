import { mount } from 'enzyme';
import App from './App'
import React from 'react';
import './setUpTests';
import Service from './App.service';
import LoadingIndicator from './shared/components/loading_indicator/loading_indicator';
import Carousel from './shared/components/carousel/Carousel';

Service.requestMatchesData = jest.fn();

describe('App', () => {
  beforeEach(() => {
    Service.requestMatchesData.mockReturnValue(Promise.resolve());
  });

  it('should render the loading indicator', () => {
    const wrapper = mount(<App />);
    wrapper.setState({
      matches: [],
      dataLoaded: false,
      errorMessage: '',
    });
    let element = wrapper.find(LoadingIndicator);
    expect(element.exists()).toBeTruthy();
    expect(element.prop('errorMessage')).toBeFalsy();
    element = wrapper.find(Carousel);
    expect(element.exists()).toBeFalsy();
  });

  it('should render the error message', () => {
    const wrapper = mount(<App />);
    wrapper.setState({
      matches: [],
      dataLoaded: true,
      errorMessage: 'Test Error Message',
    });
    let element = wrapper.find(LoadingIndicator);
    expect(element.exists()).toBeTruthy();
    expect(element.prop('errorMessage')).toEqual('Test Error Message');
    element = wrapper.find(Carousel);
    expect(element.exists()).toBeFalsy();
  });

  it('should render the error message', () => {
    const wrapper = mount(<App />);
    wrapper.setState({
      matches: [{
        name: '',
        startDateTime: '',
        sportType: '',
        eventId: 1
      }],
      dataLoaded: true,
      errorMessage: '',
    });
    let element = wrapper.find(LoadingIndicator);
    expect(element.exists()).toBeFalsy();
    element = wrapper.find(Carousel);
    expect(element.exists()).toBeTruthy();
  });
});
