import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';

const Sticker = ({ sticker, initialLoad }) => {
  const isSmallScreen = useMediaQuery('(max-height:400px)');
  const [clickedButtons, setClickedButtons] = React.useState([]);

  const handleButtonClick = (key) => {
    if (!clickedButtons.includes(key)) {
      setClickedButtons([...clickedButtons, key]);
    } else {
      setClickedButtons(clickedButtons.filter((clickedKey) => clickedKey !== key));
    }
  };

  const initialLoadImageSize = (isSmallScreen ? 70 : 120);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{
          height: (initialLoad ? initialLoadImageSize : 190),
          borderRadius: '6px 6px 0 0', // Adjust the value as needed
          overflow: 'hidden',
        }}
        image={sticker.image}
        title={sticker.name}
        style={{ backgroundPosition: 'top' }}
      />
      { !initialLoad && (
        <CardContent>
          {Object.entries(sticker.vowels).map(([key, value]) => (
            <Button
              key={key}
              size="small"
              onClick={() => handleButtonClick(key)}
              sx={{
                fontSize: isSmallScreen ? '0.8125em' : '0.7125em',
                textDecoration: clickedButtons.includes(key) ? 'line-through' : 'none',
                color: clickedButtons.includes(key) ? 'red' : 'inherit',
              }}
            >
              {key} [{value}]
            </Button>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default Sticker;
