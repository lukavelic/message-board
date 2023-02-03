import React, { useEffect, useState } from 'react';
import RegisterForm from './components/RegisterForm';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000'

function App() {
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
  })

  const [isRegistered, setIsRegistered] = useState(false);

  // useEffect(() => {
  //   fetch('/api').then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setBackendData(data);
  //     }
  //   )
  // }, []);

  const handleChange = (input) => {
    if(input.name === 'username') {
      setUserDetails({
        username: input.value,
        password: userDetails.password,
      })
    } else {
      setUserDetails({
        username: userDetails.username,
        password: input.value,
      })
    }
  }

  const handleSubmit = (event) => {

    axios.post('/register', userDetails)
      .then(res => {
        console.log(res.data)
        setIsRegistered(true);
      })
      .catch(err => {
        console.log(err.response.data)
      })


    // fetch('/register', {
    //   method: "POST",
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify(userDetails)
    // })
    // .then((response) => response.json())
    // .then((result) => {
    //   if(result.err) {
    //     console.log('there is an error', result.err)
    //   } else{
    //     setIsRegistered(true);
    //     console.log(result)
    //   }
    // })
  }

  return (
    <div>
      {isRegistered ? (<Navigate replace to='/loginPage'/>) : (<RegisterForm submitHandler={handleSubmit} changeHandler={handleChange}/>)}
    </div>
  )
};

export default App;