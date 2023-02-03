import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

function LoginPage() {
    const [userDetails, setUserDetails] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // if(cookies.get('TOKEN')) {
    //     return <Navigate replace to='/chat'/>
    // }

    const handleSubmit = (event) => {
        // console.log('hit login')
        console.log(cookies.cookies.TOKEN)

        event.preventDefault();

        axios.post('/login', userDetails)
            .then(res => {
                console.log(res.data)

                cookies.set('TOKEN', res.data.token, {
                    path: '/',
                });

                console.log(cookies.cookies.TOKEN)

                setIsLoggedIn(true);
                axios.defaults.headers.common['Authorization'] = 'Bearer' + res.data.token;

                console.log(res)
                window.location.href = "/chat";
            })
            .catch(err => {
                console.log(err)
            })

        // fetch('/login', {
        //     method: "POST",
        //     headers: {
        //       'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify(userDetails)
        //   })
        //   .then((response) => response.json())
        //   .then((result) => {
        //     if(result.err) {
        //       console.log('there is an error', result)
        //     } else{
        //         console.log(result)
        //         setIsLoggedIn(true);

        //         cookies.set("TOKEN", result.token, {
        //             path: "/",
        //         });

                
        //         window.location.href = "/chat";
        //     }
        //   })

    };

    const handleChange = (e) => {
        if(e.target.name === 'username') {
            setUserDetails({
                username: e.target.value,
                password: userDetails.password,
            })
        } else {
            setUserDetails({
                username: userDetails.username,
                password: e.target.value,
            })
        };

        console.log(userDetails)
    };

    return (
        <div>
            {isLoggedIn ? (<Navigate to='/chat'/>) : (
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='input-wrapper'>
                            <label htmlFor='username' >Username</label>
                            <input type='text' name='username' required onChange={handleChange}/>
                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' required onChange={handleChange}/>
                        </div>
                        <input type='submit' value='Login'/>
                    </form>
                    <a href="/">
                        Home
                    </a>
                </div>
            )}
        </div>
        
    )
}

export default LoginPage