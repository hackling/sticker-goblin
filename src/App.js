import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const CardImage = styled('img')({
  width: '100%',
  maxWidth: '300px',
  marginBottom: '-350px',
  top: 0,
  left: 0,
  zIndex: (props) => props.index * -1, // Ensure higher index means closer to the top
});

const App = () => {
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    const fetchStickers = async () => {
      try {
        const response = await fetch('sticker-goblin/stickers.json'); // Adjust the path as needed
        console.log(response);
        const data = await response.json();
        setStickers(data);
      } catch (error) {
        console.error('Error fetching stickers:', error);
      }
    };

    fetchStickers();
  }, []);

  console.log(stickers)

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Sticker Goblin
      </Typography>
      {stickers.map((sticker, index) => (
        <CardImage src={sticker.image} alt={sticker.name} index={index} />
      ))}
    </Container>
  );
};

export default App;
