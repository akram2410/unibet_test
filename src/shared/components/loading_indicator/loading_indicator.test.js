import { shallow } from 'enzyme';
import LoadingIndicator from './loading_indicator'
import React from 'react';
import '../../../setUpTests';

describe('LoadingIndicator', () => {
  it('should render loading indicator with no error message', () => {
    const wrapper = shallow(<LoadingIndicator />);
    const img = wrapper.find('img');
    const p = wrapper.find('p');
    expect(img.prop('alt')).toEqual('Loading...');
    expect(p.html()).toEqual('<p>Loading...</p>');
    wrapper.unmount();
  });

  it('should render error message with given error message', () => {
    const wrapper = shallow(
      <LoadingIndicator errorMessage='Test Error Message'></LoadingIndicator>
    );
    const p = wrapper.find('p');
    expect(p.html()).toEqual('<p>Test Error Message</p>');
    wrapper.unmount();
  });
});
