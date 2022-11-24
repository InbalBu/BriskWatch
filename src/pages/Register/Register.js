import React, {useState} from 'react'
import styles from './Register.module.css'
import { useNavigate } from 'react-router-dom'
import { registerUser, registerProvider } from '../../firebase'

const Register = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const submitHandler = async () => {
    // if the user didnt fill the form 
    if (!name || !email || !password) {
      setError('Please fill all the fields');
      return;
    } 
    // error handling
    const message = await registerUser(email, password, name);
    if (message) {
      setError(message);
      console.log(`This is my msg: ${message}`);
      navigate('/register');
      return;
    }
    setError(null);
    navigate('/login');
  }

  const registerProviderHandler = async () => {
    registerProvider();
    navigate('/');
  }

  return (
    <div>
    <div className='video-wrapper'>
      <video id='video_bg' className='' autoPlay loop muted>
        <source src={require('./video.mp4')} type="video/mp4" />
      </video>
    </div>

    <div className="max-w-lg bg-opacity-80 mx-auto my-10 bg-white p-5 rounded-xl" id={styles.RegisterForm}>
        <h1 class="text-4xl font-semibold text-center">Register</h1>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        <div className="my-5" >
            <div className="flex flex-col space-y-5">
                <label htmlfor="name">
                    <p className="font-medium text-slate-700 pb-2">Name</p>
                    <input id="name" name="name" autoComplete='no' type="name" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label htmlfor="email">
                    <p className="font-medium text-slate-700 pb-2">Email address</p>
                    <input id="email" name="email" autoComplete='no' type="email" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label htmlfor="password">
                    <p className="font-medium text-slate-700 pb-2">Password</p>
                    <input id="password" name="password" autoComplete='no' type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span onClick= { submitHandler }>Register</span>
                </button>
                <div className="my-5">
            <button className="w-full mt-0 text-center py-3 my-3 border flex space-x-2 bg-indigo-600 items-center justify-center border-slate-200 rounded-lg text-white hover:border-slate-400 hover:bg-indigo-500 hover:shadow transition duration-150">
                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt=""/> <span onClick={registerProviderHandler}> Continue with Google</span>
            </button>
        </div>
                <p className="text-center">Already have an account? <a className="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span class="cursor-pointer" onClick={() => navigate("/login") }>Login </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg></span></a></p>
            </div>
        </div>
    </div>
</div>

  )
}

export default Register