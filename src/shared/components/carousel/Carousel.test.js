import { shallow } from 'enzyme';
import Carousel from './Carousel'
import React from 'react';
import '../../../setUpTests';
import { ItemList } from './Carousel.styles';

describe('Carousel', () => {
  it('should render all the children in linear order', () => {
    const wrapper = shallow(
      <Carousel>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Carousel>
    );
    const itemList = wrapper.find(ItemList);
    expect(itemList.children().length).toBe(3);
    expect(itemList.childAt(0).prop('slideIndex')).toBe(0);
    expect(itemList.childAt(0).html()).toContain('Child 1');
    expect(itemList.childAt(1).prop('slideIndex')).toBe(1);
    expect(itemList.childAt(1).html()).toContain('Child 2');
    expect(itemList.childAt(2).prop('slideIndex')).toBe(2);
    expect(itemList.childAt(2).html()).toContain('Child 3');
    wrapper.unmount();
  });
});
