import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 0 2rem;
`;

export const MainContainer = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  grid-gap: 1.2rem;
  width: 100%;

  @media (max-width: 600px) {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
`;

export const ListContact = styled.div`
  margin-top: 2em;
  border: 1px solid black;
  border-radius: 0.375rem;
  box-shadow: 0.6rem 0.6rem 0 #222;
  display: flex;
  flex-direction: column;
  text-align: left;
  color: inherit;
  text-decoration: none;
`;

export const ListContactHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.8rem;

  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
  }

  button {
    margin: 0 0 0.5rem 0;
    height: 40px;
    background-color: #8bd3dd;
    box-shadow: 0.2rem 0.2rem 0 #222;
  }

  button:hover {
    cursor: pointer;
  }
`;

export const ListContactCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const InformationContact = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 200px;
`;

export const InformationContactDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

export const ListNumberContact = styled.li`
  font-size: 10px;
`;

export const ListButtonAction = styled.div`
  display: flex;
  flex-direction: row;
`;
