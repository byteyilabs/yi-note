import styled from 'styled-components';

export const StyledArchor = styled.a`
  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }
`;

export const StyledImg = styled.img`
  float: left;
  width: 20px;
  height: 20px;
  margin-right: 4px;
`;

export const StyledMainLine = styled.div`
  font-size: 0.8em;
  & > * {
    font-size: inherit;
  }
`;

export const StyledAdditionalInfo = styled.div`
  width: 100%;
  font-size: 0.8em;
  color: grey;
  & > * {
    font-size: inherit;
  }
`;
