import React, { useState, useEffect, useRef } from 'react'
import './Chat.css';
import Cookies from 'universal-cookie';
import { Navigate } from "react-router-dom";
import axios from 'axios';

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
        scrollToBottom()
    }, [messages])

    const handleChange = (e) => {
        setNewMessage({
            msg: e.target.value,
            userId: '63dbcc1e486b7745c897daad'
        });
        console.log(newMessage)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        e.target[0].value = '';
        setIsMessageSent(true);

        axios.post('/chat/send', newMessage)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response.data)
            });
    };

    // to be implemented
    const getUsername = (id) => {
        return 'luka'
    }

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
                    <div className='chat-box' id='chat'>
                        { messages.map((msg) => {
                            return (
                                <div key={msg._id} className='message-box'>
                                    <div>
                                        <p className='chat-username'>{getUsername(msg._id)}</p>
                                        <p className='timestamp'>{formatTimestamp(msg.createdAt)}</p>
                                    </div>
                                    <p className='chat-text'>{msg.msg}</p>
                                </div>
                                )
                            })
                        }
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type='text' onChange={handleChange}/>
                        <input type='submit' value='Send!'/>
                    </form>
                </div>
            ) : (<div>Access forbidden 401</div>)}
        </div>
    );
}

export default Chat