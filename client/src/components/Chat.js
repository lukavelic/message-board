import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';
import { Navigate } from "react-router-dom";
import axios from 'axios';

const cookies = new Cookies();

function Chat() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [msg, setMsg] = useState('');
    const token = cookies.get('TOKEN');

    console.log(token)

    useEffect(() => {
        // console.log('useEffect')

        // if(token) setIsAuthorized(true)

        axios.get('/chat', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            setIsAuthorized(true)
            console.log(res)
        })
        .catch(err => console.log(err))
    }, []);

    const handleChange = (e) => {
        setMsg(e.target.value);
        console.log(msg)
    }

    const handleSubmit = (e) => {

    }

    // console.log(token)

    

    // fetch('/chat')
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log(data)
    //         console.log(data.msg)
    //         if(data.msg == 'You are not authorized') return (<Navigate to='/'/>)
    //         // else setIsAuthorized(true);
    //     });

    // if(isAuthorized) {
    //     return <div>IMAMO TOKEN</div>
    // } else return <Navigate to='/'/>

    return (
        <div>
            {isAuthorized ? (
                <div>
                    <div>
                        All messages
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type='text' onChange={handleChange}/>
                        <input type='submit' value='Send!'/>
                    </form>
                </div>
            ) : (<div>Access forbidden 401</div>)}
        </div>
    )

    // return (
    //     <div>
    //         <div>
    //             <div>
    //                 All messages
    //             </div>
    //             <form onSubmit={handleSubmit}>
    //                 <input type='text' onChange={handleChange}/>
    //                 <input type='submit' value='Send!'/>
    //             </form>
    //         </div>
    //     </div>
    // )

}

export default Chat