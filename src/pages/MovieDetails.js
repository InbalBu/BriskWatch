import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import VideoInfo from '../components/VideoInfo';

const MovieDetails = () => {

  const [videoKey, setVideoKey] = useState();
  const [movieDetails, setMovieDetails] = useState();
  const { id } = useParams(); // this is the id of the movie we are looking for
  // follows the name of the variable i gave in the route

  const baseUrl = 'https://api.themoviedb.org/3';
  const movieDetailsUrl = `${baseUrl}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY_MOVIE}`;
  const videoUrl = `${baseUrl}/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY_MOVIE}`;
  const imgUrl = "https://image.tmdb.org/t/p/w1280";

  useEffect(() => {
    axios.get(movieDetailsUrl).then(res => setMovieDetails(res.data));
    axios.get(videoUrl).then(res => setVideoKey(res.data.results[0].key));
  }, [movieDetails, videoKey, id]);
  // when the movie id get changed, the useEffect will run again

  return (
    <div className='bg py-5'>
      <div className='sm:mx-14 md:container-md md:mx-24 xl:mx-64'>
        <div className='card mb-3 text-white bg-black shadow-xl'>
          <div className='grid grid-cols-3'>
            <div className=''>
              <img src={imgUrl + movieDetails?.poster_path} className="img-fluid rounded-sm" alt="" />
              <ul className='list-group list-group-flush'>
                <li className='list-group-item d-flex justify-content-between py-2 px-4'>
                  <b>Release Date:</b>
                  <span className='px-2'>{movieDetails?.release_date}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between  py-2 px-4'>
                  <b>Rate:</b>
                  <span className='px-2'>{movieDetails?.vote_average.toFixed(1)}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between  py-2 px-4'>
                  <b>Total Votes:</b>
                  <span className='px-2'>{movieDetails?.vote_count}</span>
                </li>
                <li className='list-group-item text-center bg-orange-600 m-3 py-2 px-4 focus:outline-none hover:text-white text-white font-semibold'>
                  <Link className='hover:text-white focus:outline-none text-xl' to={-1} >Go Back</Link>
                </li>
              </ul>
            </div>
            <div className='col-span-2'>
              <div className='card-body px-4 py-2'>
                <h5 className='card-title text-2xl text-center font-semibold mb-3'>{movieDetails?.title}</h5>
                {videoKey && <VideoInfo className="object-cover" videoKey={videoKey} />}
                <h5 className='card-title mt-4 text-xl font-semibold'>Overview</h5>
                <p className='card-text'>{movieDetails?.overview}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails