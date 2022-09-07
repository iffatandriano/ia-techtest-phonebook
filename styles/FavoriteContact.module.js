import styled from '@emotion/styled';

export const FavoriteContactContainer = styled.div`
  margin-top: 2em;
  border: 1px solid black;
  border-radius: 0.375rem;
  box-shadow: 0.6rem 0.6rem 0 #222;
  display: flex;
  flex-direction: column;
  text-align: left;
  color: inherit;
  text-decoration: none;
  max-height: 350px;
  h2 {
    padding: 0.8rem;
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
  }
  p {
    padding: 0.8rem;
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;

export const FavoriteContactScroll = styled.div`
  max-height: 350px;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const FavoriteContactCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;

export const InformationContact = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InformationContactDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;

  span {
    font-size: 16px;
    font-weight: bold;
  }
`;
