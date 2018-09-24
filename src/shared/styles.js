import styled from 'styled-components';

export const CentricContainer = styled.div`
  text-align: center;

  & > * {
    display: inline-block;
    vertical-align: middle;
  }
`;
