import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const CenteredContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

const App = () => {
  return (
    <CenteredContainer maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Hello, Material-UI!
      </Typography>
      <Button variant="contained" color="primary">
        Click me
      </Button>
    </CenteredContainer>
  );
};

export default App;
