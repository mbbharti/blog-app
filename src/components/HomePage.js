import React from 'react'
import GoogleLogin from 'react-google-login';
import { VscBook } from "react-icons/vsc";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import {selectSignedIn, selectUserData, setSignedIn, setUserData} from '../features/UserSlice';
import '../styling/home.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const login = (response)=>{
        // console.log(response);
        dispatch(setSignedIn(true));
        dispatch(setUserData(response.profileObj));
    }

    const isSignedIn = useSelector(selectSignedIn);

    return (
        <>
        <div className="home__page" style={{display:isSignedIn ? 'none' : ""}} >
            {
                !isSignedIn ? (
                    <div className="login__message">
                <h2>
                    <VscBook />
                </h2>
                <h1>A Readers Favorite Place!  </h1>
                <p>We provide high quality of online resources for reading Blogs,Just login and start reading some Awesome Content.</p>
                <GoogleLogin
                    clientId="891670107264-v16ar4ui9jvv48bvu071kb4tpa0sm85v.apps.googleusercontent.com"
                    render = {(renderProps) =>(
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className='login__button'
                        >
                            Login with Google <AiFillGoogleCircle />
                        </button>    
                    )}
                    onSuccess={login}
                    onFailure={login}
                    isSignedIn={true}
                    cookiePolicy={'single_host_origin'}
                 />   
            </div>
                ) : 
                ""
            }
        </div>
            
        </>
    )
}

export default HomePage
