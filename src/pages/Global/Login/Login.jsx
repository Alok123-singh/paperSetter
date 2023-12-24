import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button1, Input1, Logo, Loading1 } from "../../../components/index.js"
import {useForm} from "react-hook-form"
import { useDispatch } from 'react-redux';
import { setUsername, setLoginStatus } from '../../../store/authSlice.js'
import { MdAutorenew } from 'react-icons/md';
// import { IoIosRefresh, IoIosRefreshCircle, IoIosSync, IoMdRefresh  } from 'react-icons/io';


function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const dispatch = useDispatch();

    const login = async(data) => {
        setLoading(true);
        console.log(data);
        setError("")

        try{
            const credentials = btoa('5595832005:5dceeeb7-47f3-4dc9-8f00-2845af1da8d2');
            const response = await fetch('http://localhost:8082/simlearn/authentication/api/v1/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                    'Authorization': `Basic ${credentials}`,
                    // Add any other headers if needed
                },
                body: JSON.stringify(data), // Convert the data to a JSON string
            });
            const data2 = await response.json();
            
            if(data2 === true){
                dispatch(setUsername(data.username));
                dispatch(setLoginStatus(true));
                console.log("Login Successfull");
                navigate('/');
            }
            else{
                // console.log('Login Error -: ',data2);
                setError(data2.message);
                console.log("Login Failed");
            }

        }
        catch(error){
            console.log("Login Error :",error);
            // setError(error);

            const fakeError = new Error('Fetch API was not able to connect to the requested resource');

            // Create an error event
            const errorEvent = new Event('error');
            errorEvent.error = fakeError;

            // Dispatch the error event
            window.dispatchEvent(errorEvent);

            // throw new Error('Fetch API was not able to connect to the requested resource');
        }
        setLoading(false);
    }

    return (
        <div
        className={`${loading === true && 'cursor-wait'} flex items-center justify-center w-full py-8 dark:bg-gray-400 dark:text-gray-800`}
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 dark:bg-gray-300 rounded-xl p-7 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="w-full flex justify-center items-center">
                        <Link 
                        to = "/"
                        >
                            <Logo width="100%" />
                        </Link>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-sans leading-tight">
                    Login
                </h2>
                <p className="mt-2 text-center text-base text-black/60 font-bold">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-7'>
                        <Input1
                        // label = "Username"
                        type="text"
                        placeholder="Username"
                        {...register("username", {
                            required: true,
                        })}
                        
                        />

                        <div className='relative'>
                            <Input1
                                type='password'
                                placeholder='Password'
                                {...register('password', {
                                required: true,
                                })}
                            />
                            
                        </div>

                        {/* <Button
                        type="submit"
                        className="w-full"
                        >Sign in</Button> */}

                        {loading === false ? (
                            <Button1
                            type="submit"
                            className="w-full"
                            >Sign in</Button1>
                        ) : (
                            <div className='w-full justify-center items-center'>
                                <button disabled type="button" className="w-full justify-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                <MdAutorenew size={20} className='animate-spin' />
                                Loading...
                                </button>
                            </div>
                        )}
                    

                    </div>
                </form>

                <button 
                className='text-blue mt-7 pl-1 text-red-600'
                type='button'
                onClick={() => navigate('/reset-password')}
                >
                    Forgot password &#63;
                </button>

            </div>
            
        
        </div>
    )
}

export default Login