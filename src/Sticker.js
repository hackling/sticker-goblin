import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Sticker = ({ sticker, initialLoad }) => {
  const [clickedButtons, setClickedButtons] = React.useState([]);

  const handleButtonClick = (key) => {
    if (!clickedButtons.includes(key)) {
      setClickedButtons([...clickedButtons, key]);
    } else {
      setClickedButtons(clickedButtons.filter((clickedKey) => clickedKey !== key));
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: (initialLoad ? 100 : 200) }}
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
