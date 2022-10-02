import React, { useCallback, useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [stop, setStop] = useState(null);

  const fetchMoviesHandler = useCallback(async() => {
    setIsLoading(true)
    setError(null)
    // setStop(null)
    try {
      const res = await fetch('https://swapi.dev/api/films')
      if(!res.ok){
        throw new Error('Something went wrong ....Retrying')
      }
    const data = await res.json()

      const transformedData = data.results.map((movieData) => {
        return{
          id: movieData.episode_id,
          titile: movieData.titile,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedData);
      setIsLoading(false);
      
    } catch (error) {
      setError(error.message);
      // const interval = setInterval(async() => {
      //   await fetch("https://swapi.py4e.com/api/films/");
      // }, 5000);
      // <button onClick={stopRetryingHandler}>Cancel</button>
      // setStop(interval);
    }
    setIsLoading(false);

  },[]);

  useEffect(() => {
    fetchMoviesHandler() 
  }, [fetchMoviesHandler]);
  
  // const stopRetryingHandler = () => {
  //   clearInterval(stop);
  // };
    
  let content = <p>Found no movies!</p>;

  if(movies.length > 0){
    content = <MoviesList movies={movies} />
  }

  if(error){
    content = <p>{error}</p>
  }

  if(isLoading){
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
