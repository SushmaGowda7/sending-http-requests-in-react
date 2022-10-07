import React, { useCallback, useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async() => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('https://react-http-requests-3c6c0-default-rtdb.firebaseio.com/movies.json')
      if(!res.ok){
        throw new Error('Something went wrong ....Retrying')
      }
    const data = await res.json();

    const addeddMovies = [];
    for (const key in data) {
      addeddMovies.push({
        id: key,
        titile: data[key].titile,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate
      })
    } 
      setMovies(addeddMovies);
      setIsLoading(false);
      
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);

  },[]);

  useEffect(() => {
    fetchMoviesHandler() 
  }, [fetchMoviesHandler]);

  const addMovieHandler = async(movie) => {
    const res = await fetch('https://react-http-requests-3c6c0-default-rtdb.firebaseio.com/movies.json', 
    {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {'Content-type': 'application/json'}
  })
  const data = await res.json();
  console.log(data);
}
const deleteMovieHandler = async(id) => {
  const res = await fetch(`https://react-http-requests-3c6c0-default-rtdb.firebaseio.com/movies/${id}.json`, 
  {
    method: 'DELETE',
})
const data = await res.json();
console.log(data);
}
  let content = <p>Found no movies!</p>;

  if(movies.length > 0){
    content = <MoviesList onDelete={deleteMovieHandler} movies={movies} />
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
      <AddMovie onAddMovie={addMovieHandler}/>
    </section>
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
