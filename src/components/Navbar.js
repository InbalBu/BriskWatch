import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { MovieContext } from '../context/MoviesContext';
import { logout } from '../firebase';

const baseUrl = "https://api.themoviedb.org/3";
const searchUrl = `${baseUrl}/search/movie?api_key=${process.env.REACT_APP_API_KEY_MOVIE}&query=`;

const Navbar = () => {

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    // using the hook on the context and thats how i got access to the data from the provider in the App.js 
    const { movies, setMovies } = useContext(MovieContext);
    // passing the setMovies function to the search function so it can update the state of the movies
    // passing the movie context
    const [search, setSearch] = useState('');

    const logoutHandler = () => {
        logout();
        navigate('/login');
    }
    
    const searchHandler = async () => {
        const response = await axios.get(`${searchUrl}${search}`);
        setMovies(response.data.results);
        console.log(response.data.results);
    }

  return (
    <nav class="shadow-2xl  bg-white border-gray-200 sm:px-4 px-2 py-2.5 ">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
            <Link to="/" class="flex items-center border-transparent focus:outline-none  focus:border-transparent focus:ring-0">
                <h1 className='sm:m-3 text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600'>BriskWatch</h1>
            </Link>
            <div class=" align-items-center">
                { currentUser ? (
                   <div>
                       <form className='inline-block focus:outline-none'>   
                            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input onChange={(e) => setSearch(e.target.value)} value={search} type="search" id="default-search" class="block navPhone focus:outline-none overflow-hidden max-w-xs w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-lime-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Search..." required/>
                                <button type="button" onClick={ searchHandler } class="text-white font-semibold absolute right-2.5 bg-orange-600 bottom-2.5  focus:outline-none rounded-2xl text-sm px-4 py-2">Search</button>
                            </div>
                        </form>
                        <h4 className='text-capitalize phone font-semibold text-2xl text-black drop-shadow-xl inline-block ml-5 mr-5 p-2 mx-2'>{currentUser?.displayName}</h4>
                        <button type="button" onClick={ logoutHandler} class="text-white onPhone bg-orange-600 hover:bg-gradient-to-br  focus:outline-none font-semibold rounded-2xl text-sm px-5 py-2.5 text-center mr-2 mb-2">Logout</button>
                    </div>
                ): (
                    <div>
                        <button type="button" class="text-white bg-orange-600 hover:bg-gradient-to-br  focus:outline-none font-semibold rounded-2xl text-sm px-5 py-2.5 text-center mr-7 mb-2 " onClick={() => navigate("/login")}>Login</button>
                        <button type="button" class="text-white bg-orange-600 hover:bg-gradient-to-br  focus:outline-none font-semibold rounded-2xl text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => navigate("/register")}>Register</button>
                    </div>
                ) }
            </div>
        </div>
    </nav>
  )
}

export default Navbar