import React from 'react';
import styled from 'styled-components/native';
import Home from './screens/Home';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #101111;
`;

const App: React.FC = () => {
  return (
    <Container>
      <Home />
    </Container>
  );
};

export default App;
