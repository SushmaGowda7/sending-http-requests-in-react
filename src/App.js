import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  async function fetchMoviesHandler() {
    setIsLoading(true)
    const res = await fetch('https://swapi.dev/api/films')
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
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...!</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
