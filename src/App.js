import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, ImageList, ImageListItem, ImageListItemBar, Paper } from '@mui/material';
import { styled } from '@mui/system';

const CenteredContainer = styled(Container)({
  padding: '15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

const App = () => {
  const [stickers, setStickers] = useState([]);
  const [shuffledStickers, setShuffledStickers] = useState(stickers);

  useEffect(() => {
    const fetchStickers = async () => {
      try {
        const response = await fetch('sticker-goblin/stickers.json'); // Adjust the path as needed
        console.log(response);
        const data = await response.json();
        setStickers(data);
        setShuffledStickers(data)
      } catch (error) {
        console.error('Error fetching stickers:', error);
      }
    };

    fetchStickers();
  }, []);
const handleRandomSelection = () => { 
    const randomizedStickers= [...stickers].sort(() => Math.random() - 0.5);
    const selected = randomizedStickers.slice(0, 3);
    setShuffledStickers(selected);
  };

  return (
    <CenteredContainer maxWidth="md">
      <Button variant="contained" color="primary" onClick={handleRandomSelection}>
        Randomly Select Stickers
      </Button>
      <ImageList cols={3} gap={16} style={{ width: '100%', maxWidth: '800px' }}>
        {shuffledStickers.map((sticker, index) => (
          <Paper elevation={3}>
            <ImageListItem key={index}>
              <img src={sticker.image} alt={sticker.name} style={{ width: '100%' }} />
            </ImageListItem>
          </Paper>
        ))}
      </ImageList>
    </CenteredContainer>
  );
};

export default App;
