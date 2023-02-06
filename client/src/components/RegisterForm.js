import React from 'react';
import './RegisterForm.css'

function RegisterForm(props) {

    const submitHandler = (event) => {
        event.preventDefault();
        props.submitHandler()
    }

    const changeHandler = (e) => {
        props.changeHandler(e.target)
    }

    return (
        <div className='register-box'>
            <form onSubmit={submitHandler}>
                <div className='input-wrapper'>
                    <label htmlFor='username' >Username</label>
                    <input type='text' name='username' required onChange={changeHandler}/>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' required onChange={changeHandler}/>
                </div>
                <input type='submit' className='button' value='Register!'/>
            </form>
            <span className='login-text'>Already have an account?</span>
            <a href="/loginPage">
                <button className='button'>Login!</button>
            </a>
        </div>
    )
}

export default RegisterForm;