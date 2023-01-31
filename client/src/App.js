import React, { useEffect, useState } from 'react';
import RegisterForm from './components/RegisterForm';

function App() {
  const [backendData, setBackendData] = useState({
    username: '',
    password: '',
  })

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
      setBackendData({
        username: input.value,
        password: backendData.password,
      })
    } else {
      setBackendData({
        username: backendData.username,
        password: input.value,
      })
    }
  }

  const handleSubmit = (event) => {
    fetch('/register', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(backendData)
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
    })
  }

  return (
    <div>
      <RegisterForm submitHandler={handleSubmit} changeHandler={handleChange}/>
    </div>
  )
};

export default App;