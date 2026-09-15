export const exerciseOptions = {
  method: 'GET',
  hostname: 'exercisedb.p.rapidapi.com',
  port: null,
  path: '/exercises/bodyPart/back?limit=10&offset=0',
  headers: {
    'x-rapidapi-key': process.env.REACT_APP_EXERCISEDB_API_KEY,
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
  }
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY,
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};
