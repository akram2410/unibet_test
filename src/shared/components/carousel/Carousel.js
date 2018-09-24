import React, { Component } from 'react';
import Item, { ItemList } from './Carousel.styles';

class Carousel extends Component {
  render() {
    return (
      <ItemList>
        {this.props.children.map(
          (child, index) =>
            <Item key={index} slideIndex={index}>{child}</Item>)}
      </ItemList>
    );
  }
}

export default Carousel;
