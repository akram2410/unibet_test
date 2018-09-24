import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const slideFrame = keyframes`
  0% {
    transform: translateX(100%);
  }
  12.5%,
  87.5% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const firstSlideFrame = keyframes`
  87.5% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const lastSlideFrame = keyframes`
  0% {
    transform: translateX(100%);
  }
  12.5%,
  100% {
    transform: translateX(0);
  }
`;

export const ItemList = styled.ul`
  position: relative;
  list-style: none;
  overflow: hidden;
  padding: 0;
  height: 13em;

  & > li {
    background-color: #272727;
    position: absolute;
    top: 0;
    width: 100%;
    animation-duration: 3.5s;
    animation-fill-mode: both;

    &:not(:first-child):not(:last-child) {
      animation-name: ${slideFrame};
    }

    &:first-child {
      animation-name: ${firstSlideFrame};
    }

    &:last-child {
      animation-name: ${lastSlideFrame};
    }

    &:not(:first-child) {
      transform: translateX(100%);
    }
  }
`;

const Item = props => {
  const LiPrimitive = styled.li`
    animation-delay: ${props.slideIndex * 3}s;
  `;
  return <LiPrimitive>{props.children}</LiPrimitive>
};

Item.propTypes = {
  slideIndex: PropTypes.number
};

export default Item;
