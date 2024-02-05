const fs = require('fs').promises;

async function fetchData(urls) {
  const result = [];

  for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      const { name, image_uris, scryfall_uri } = data;



      const vowels = {};
      const words = name.toLowerCase().split(' ');
      words.forEach(word => {
        const detectedVowels = word.split('').filter(char => 'aeiouy'.includes(char));
        vowels[word] = [...new Set(detectedVowels)].length;
      });

      result.push({
        name: name,
        image: image_uris ? image_uris.normal : null,
        url: scryfall_uri,
        vowels: vowels,
      });
    } catch (error) {
      console.error(`Error fetching data from ${url}: ${error.message}`);
    }
  }

  return result;
}

async function saveToFile(data, filename) {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${filename}`);
  } catch (error) {
    console.error(`Error saving data to ${filename}: ${error.message}`);
  }
}

// Example usage
const urls = [
  'https://api.scryfall.com/cards/633f98c3-ffec-48c0-ac01-d599312fe288',
  'https://api.scryfall.com/cards/34c3979d-60e7-44b5-bb9f-1b6b0f2b70c3',
  'https://api.scryfall.com/cards/e6952074-d6c2-4fbe-88ca-6d42f83c7ee7',
  'https://api.scryfall.com/cards/5daeb14a-dcc5-4761-84a4-a60d22a6c944',
  'https://api.scryfall.com/cards/955c33c6-0cc6-47ec-8f71-8d169c02b243',
  'https://api.scryfall.com/cards/b8f1abc7-1a86-4e43-8105-10c1c55e65ba',
  'https://api.scryfall.com/cards/1b516ae7-2891-40e9-80a1-48ec62171275',
  'https://api.scryfall.com/cards/7985d1dd-32cf-4c83-ae68-ee4961c1e6b9',
  'https://api.scryfall.com/cards/3bf70946-5a50-4918-bb61-23be7c2cc75a',
  'https://api.scryfall.com/cards/c27dffce-908c-45cf-bfe5-67af12467321',
];

fetchData(urls)
  .then(result => {
    return saveToFile(result, 'public/stickers.json');
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
  });
