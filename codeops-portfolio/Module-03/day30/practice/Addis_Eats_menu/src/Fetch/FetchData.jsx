import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [dishes, setDishes] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 
    
    setIsLoading(true);
    setError(null);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        if (isMounted) {
          setDishes(responseData);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Something went wrong');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]); 

  return { dishes, loading, error };
}
