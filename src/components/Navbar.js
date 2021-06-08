import { Avatar } from '@material-ui/core';
import React, { useState } from 'react'
import { GoogleLogout } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux'
import {selectSignedIn, selectUserData, setInput, setSignedIn, setUserData} from '../features/UserSlice';
import '../styling/navbar.css';

const Navbar = () => {
    const [inputValue,setInputValue] = useState('tech');
    const isSignedIn = useSelector(selectSignedIn);
    const userData = useSelector(selectUserData);
    const dispatch = useDispatch();
    const logout = (response)=>{
        dispatch(setSignedIn(false));
        dispatch(setUserData(null));
    }
    const handleClick = (e)=>{
        e.preventDefault();
        dispatch(setInput(inputValue));
    };

    return (
        <>
            <div className="navbar">
                <h1 className="navbar__header">
                    BlogPost
                </h1>
                {isSignedIn && (
                    <div className="blog__search">
                        <input
                            className='search'
                            placeholder='Search for a Blog'
                            value={inputValue}
                            onChange = {(e)=> setInputValue(e.target.value)}
                         />
                        <button className="submit" onClick={handleClick}>
                             Search
                        </button>   
                    </div>
                ) }
                {
                    isSignedIn ? (
                        <div className="navbar__user__data">
                            <Avatar className='user' src={userData?.imageUrl} alt={userData?.name} />
                            <h1 className="signedIn">{userData?.givenName}</h1>
                            <GoogleLogout
                                 clientId="891670107264-v16ar4ui9jvv48bvu071kb4tpa0sm85v.apps.googleusercontent.com"
                                 render = {(renderProps) =>(
                                    <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className='logout__button'
                                    >
                                        LogOut
                                    </button>    
                                )}
                                onLogoutSuccess={logout}
                                /> 
                        </div>
                    ) : (
                        <h1 className="notSignedIn">User Not Available</h1>
                    )
                }
            </div>
            
        </>
    )
}

export default Navbar
