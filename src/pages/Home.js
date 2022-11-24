import React, { useEffect, useContext } from 'react'
import axios from 'axios';
import MovieCard from '../components/MovieCard/MovieCard';
import { MovieContext } from '../context/MoviesContext';

const baseUrl = 'https://api.themoviedb.org/3';
const moviesUrl = `${baseUrl}/discover/movie?api_key=${process.env.REACT_APP_API_KEY_MOVIE}`;

const Home = () => {

  const { movies, setMovies } = useContext(MovieContext);

  useEffect(() => {
    getMovies(moviesUrl);
  }, []);

  const getMovies = async (url) => {
    const res = await axios.get(url);
    setMovies(res.data.results);
  }
  
  // passing props to MovieCard component so he can have access to the data of the movie
  return (
    <div className='bg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-10 pb-10 pl-20 pr-20 lg:grid-cols-5 xl:grid-cols-5 gap-5 '>
      {movies.map(movie => <MovieCard key={movie.id} movie = {movie} />)}
    </div>
  )
}

export default Home