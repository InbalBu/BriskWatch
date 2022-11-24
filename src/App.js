import { Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MovieDetails from './pages/MovieDetails';
import { useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import { authListener} from './firebase'
import { MovieContext } from './context/MoviesContext';


function App() {

  const [currentUser, setCurrentUser] = useState();
  // AuthContext provides the data to all componentes inside it, its children
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    authListener(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={ {currentUser} }> 
    <MovieContext.Provider value={ {movies, setMovies} }>
    {/* now that currentUser state is available to all components inside AuthContext */}
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/details/:id" element={<MovieDetails/>}/>
      </Routes>
      </MovieContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
