export const fetchFromAPI = async (endpoint, data) => {
    const res = await fetch(`https://your-backend-url/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  };
  