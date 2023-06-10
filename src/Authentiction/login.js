import React, { useRef, useState } from 'react';
import "./login.css";
import { Card } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Signup from './signup';

function Login() {

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  const loginHandler = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log("user logged in");
      window.localStorage.setItem("email", email)
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  function toggleSignup() {
    setShowSignup(!showSignup);
  }


  return (
    <div className='loginwrapper'>
      <Card variant='outlined'>
        {showSignup ? (
          <Signup toggleSignup={toggleSignup} />
        ) : (
          <div className='login'>
            <Form onSubmit={loginHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label><br />
                <Form.Control type="email" placeholder="Enter email" ref={emailInputRef} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <br />
                <Form.Control type="password" placeholder="Password" ref={passwordInputRef} />
              </Form.Group>

              <div className='mail_login'>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        )}

        <div className='para'>
          <p>
            <b>Don't Have an Account?</b>
            <button type='button' className='para_btn' onClick={toggleSignup}>
              Sign Up!
            </button>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Login;