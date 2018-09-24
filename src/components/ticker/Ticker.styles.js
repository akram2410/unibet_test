import styled from 'styled-components';

import defaultImage from '../../images/icons/default.png';
import basketballImage from '../../images/icons/basketball.png';
import footballImage from '../../images/icons/football.png';
import tennisImage from '../../images/icons/tennis.png';

export const TickerContainer = styled.div`
  padding: 1em;
  text-align: center;

  & > * {
    margin: 0.5em;
  }
`;

export const CurrentScore = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #F0be1C;
`;

export const TeamName = styled.div`
  font-size: 1rem;
  color: #fff;
`;

export const DateTime = styled.div`
  color: #999999;
`;

export const AnchorButton = styled.a.attrs({ target: '_blank' })`
  background-color: #3AAA35;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.6em;
  color: #fff;
  margin-top: 1em;
  display: inline-block;
  text-decoration: none;
`;

export const Icon = styled.div`
  height: 16px;
  width: 16px;
  background: url(${defaultImage});
  margin-right: 4px;

  &.football {
    background: url(${footballImage});
  }

  &.basketball {
    background: url(${basketballImage});
  }

  &.tennis {
    background: url(${tennisImage});
  }
`;

