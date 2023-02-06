import React, { useState, useEffect, useRef } from 'react'
import './Chat.css';
import Cookies from 'universal-cookie';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Header from './Header';

const cookies = new Cookies();

function Chat() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({});
    const token = cookies.get('TOKEN');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        axios.get('/chat', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
            setIsAuthorized(true)
            setMessages(res.data)
            console.log(messages)
        })
        .catch(err => console.log(err))

        setIsMessageSent(false);
        
        // scrollToBottom('chat');
        
    }, [isMessageSent]);

    useEffect(() => {
        const updateTimer = () => { setTimeout(() => {
            axios.get('/chat', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((res) => {
                setIsAuthorized(true)
                setMessages(res.data)
                console.log(messages)

                updateTimer();
            })
            .catch(err => console.log(err))
        }, 1500)
        }

        updateTimer();
    }, [])
 
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleChange = (e) => {
        setNewMessage({
            msg: e.target.value,
            userId: cookies.cookies.userId,
            username: cookies.cookies.username,
        });
        console.log(newMessage)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        e.target[0].value = '';
        setIsMessageSent(true);

        axios.post('/chat/send', newMessage)
            .then(res => {
                console.log(res.data);
                setNewMessage({})
            })
            .catch(err => {
                console.log(err.response.data)
            });
    };

    // to be implemented
    // const getUsername = (id) => {
    //     return 'luka'
    // }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const formatTimestamp = (timestamp) => {
        const dateObject = new Date(timestamp);

        return `${dateObject.getDate()}/${dateObject.getMonth()}/${dateObject.getFullYear()} ${dateObject.getHours()}:${dateObject.getMinutes()}`;
    };

    return (
        <div>
            {isAuthorized ? (
                <div>
                    <Header/>
                    <div className='chat-box' id='chat'>
                        { messages.map((msg) => {
                            return (
                                <div key={msg._id} className='message-box'>
                                    <div className='message-info'>
                                        <p className='chat-username'>{msg.username}</p>
                                        <p className='timestamp'>{formatTimestamp(msg.createdAt)}</p>
                                    </div>
                                    <p className='chat-text'>{msg.msg}</p>
                                </div>
                                )
                            })
                        }
                        <div ref={messagesEndRef} />
                    </div>
                    <form className='new-message' onSubmit={handleSubmit}>
                        <input type='text' className='new-message-box' onChange={handleChange}/>
                        <label>
                            <input type='submit'/>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                            </svg>
                        </label>
                    </form>
                </div>
            ) : (<div>Access forbidden 401</div>)}
        </div>
    );
}

export default Chat