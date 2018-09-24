import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CentricContainer } from '../../styles';
import loaderImage from '../../../images/loader.gif';

class LoadingIndicator extends Component {
  render() {
    const errorContent = <p>{this.props.errorMessage}</p>;
    const loadingContent = (
      <div>
        <img src={loaderImage} alt="Loading..." />
        <p>Loading...</p>
      </div>
    );
    const content = this.props.errorMessage ? errorContent : loadingContent;
    return (
      <CentricContainer>
        {content}
      </CentricContainer>
    );
  }
}

LoadingIndicator.propTypes = {
  errorMessage: PropTypes.string
};

export default LoadingIndicator;
