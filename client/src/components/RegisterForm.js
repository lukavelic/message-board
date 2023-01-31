import React from 'react';

function RegisterForm(props) {

    const submitHandler = (event) => {
        event.preventDefault();
        props.submitHandler()
    }

    const changeHandler = (e) => {
        props.changeHandler(e.target)
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className='input-wrapper'>
                    <label htmlFor='username' >Username</label>
                    <input type='text' name='username' onChange={changeHandler}/>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' onChange={changeHandler}/>
                </div>
                <input type='submit' value='Register!'/>
            </form>
        </div>
    )
}

export default RegisterForm;