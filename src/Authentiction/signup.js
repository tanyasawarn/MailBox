import React, { useRef } from 'react';
import { Card } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import "./signup.css";
import { auth, db } from '../firebase';

function Signup() {

  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const signupHandler = async (event) => {

    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    try {

      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await db.collection('users').doc(user.uid).set({

      });
      alert('User signed up scuessfully')
      window.localStorage.setItem("email", email)

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='loginwrapper'>
      <Card variant='outlined'>

        <div className='login'>
          <Form onSubmit={signupHandler}>
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
              <Button variant="primary" type="submit" onClick={() => navigate('/mails')}>
                Sign Up!
              </Button>
            </div>

          </Form>
        </div>

        <div className='para'>
          <p> <b> Have An Account?</b>
            <button type='sumit' className='para_btn'>Login</button>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Signup;