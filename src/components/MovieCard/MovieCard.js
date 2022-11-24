import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const baseImgUrl = 'https://image.tmdb.org/t/p/w1280/';

const MovieCard = (props) => {

    const navigate = useNavigate();

    const {currentUser} = useContext(AuthContext); // gives acess to the current user 
    const { title, poster_path, overview, vote_average, id } = props.movie;

    const showDetails = (id) => {
        if (currentUser) {
            navigate(`/details/${id}`);
        } else {
            alert('Please login to see more details');
        }
    }

    const setVoteColor = (vote) => {
        if (vote >= 8)  return 'green';
        else if (vote >= 6) return 'goldenrod';
        else return 'red';
    }


  return (
    <div className='movie max-w-sm bg-black rounded overflow-hidden relative cursor-pointer mr-auto ml-auto' onClick={() => showDetails(id)}>
        <img src={`${baseImgUrl}${poster_path}`} onerror="window.hideErrorActor(this)" alt={title} />
        <div className='text-center bg-black p-2 text-white '>
            <h5>{title}</h5>
            {currentUser && <span style={ {backgroundColor: setVoteColor(vote_average)}} className='vote'>{vote_average}</span>}
        </div>
        <div className='overview overflow-auto xs:text-sm sm:text-sm md:text-sm lg:text-md xl:text-lg'>
            <h2 className='text-xl'>Overview</h2>
            <h5 className='text-lg'>{title}</h5>
            <p>{overview}</p>
        </div>
    </div>
  )
}

export default MovieCard