import React, {useState} from 'react'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerProvider, forgotPassword } from '../../firebase'

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        if (!email || !password) {
            setError('Please enter all fields');
            return;
        }

        const message = await loginUser(email, password);
        if (message) {
            setError(message);
            navigate('/login');
            return;
        }

        setError(null);
        navigate('/');
    }

    const loginProviderHandler = async () => {
        registerProvider();
        navigate('/');
    }

    const forgotPasswordHandler = async (email) => {
        const message = await forgotPassword(email);
        if (message) setError(message);
    }

  return (
    <div>
    <div className='video-wrapper'>
      <video id='video_bg' className='' autoPlay loop muted>
        <source src={require('./video.mp4')} type="video/mp4" />
      </video>
    </div>

    <div className="max-w-lg mx-auto my-10 bg-white bg-opacity-80 p-5 rounded-xl" id={styles.loginForm}>
        <h1 class="text-4xl text-black drop-shadow-md font-semibold text-center">Login</h1>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        <div class="my-5" >
            <div class="flex flex-col space-y-5">
                <label htmlfor="email">
                    <p class="font-medium text-slate-700 pb-2">Email address</p>
                    <input id="email" name="email" autoComplete='no' type="email" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label htmlfor="password">
                    <p class="font-medium text-slate-700 pb-2">Password</p>
                    <input id="password" name="password" autoComplete='no' type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <div class="flex flex-row justify-between">
                    <div>
                        <a onClick={() => forgotPasswordHandler(email)} class="font-medium cursor-pointer text-indigo-600">Forgot Password?</a>
                    </div>
                </div>
                <button class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span onClick={handleSubmit}>Login</span>
                </button>
                <div class="my-5">
            <button class="w-full mt-0 text-center py-3 my-3 border flex space-x-2 bg-indigo-600 items-center justify-center border-slate-200 rounded-lg text-white hover:border-slate-400 hover:bg-indigo-500 hover:shadow transition duration-150">
                <img src="https://www.svgrepo.com/show/355037/google.svg" class="w-6 h-6" alt=""/> <span onClick={loginProviderHandler}>Login with Google</span>
            </button>
        </div>
                <p class="text-center">Not registered yet? <a class="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span class="cursor-pointer" onClick={() => navigate("/register") }>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg></span></a></p>
            </div>
        </div>
    </div>
</div>

  )
}

export default Login