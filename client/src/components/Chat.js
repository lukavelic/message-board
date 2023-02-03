import React from 'react'
import Cookies from 'universal-cookie';
import { Navigate } from "react-router-dom";

const cookies = new Cookies();

function Chat() {
    const token = cookies.get('TOKEN');

    // console.log(token)

    fetch('/chat')
        .then((response) => response.json())
        .then((data) => console.log(data));

    if(token) {
        return <div>IMAMO TOKEN</div>
    } else return <Navigate to='/'/>
}

export default Chat