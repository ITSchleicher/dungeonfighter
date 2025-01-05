import React from 'react';
// import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Signup.css';


export default function Signup () {
    return (

        // <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        //     <div className='bg-white p-3 rounded w-25'>
        //         <h2>Sign-Up</h2>
        //         <form action="">
        //             <div className='mb-3'>
        //                 <label htmlFor="username"><strong>Username</strong></label>
        //                 <input type="username" placeholder="Enter Username" classname='form-control rounded-0'/>
        //             </div>
        //             <div className='mb-3'>
        //                 <label htmlFor="email"><strong>Email</strong></label>
        //                 <input type="email" placeholder="Enter Email" classname='form-control rounded-0'/>
        //             </div>
        //             <div className='mb-3'>
        //                 <label htmlFor="password"><strong>Password</strong></label>
        //                 <input type="password" placeholder="Enter Password" classname='form-control rounded-0'/>
        //             </div>
        //             <button className='btn btn-success w-100 rounded-0'> Sign up</button>
        //             <Link to="/components/pages/Login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
                    
        //         </form>
        //     </div>
        // </div>

      <Container id="login-container" className="d-grid h-100">
      <Form id="sign-in-form" className="text-center w-100">
        <img
          className="mb-4 bootstrap-logo"
          src="https://i.pinimg.com/736x/ae/7c/ae/ae7caeb388343825b9d01eed51d09aab.jpg"
          alt="Bootstrap logo" />
          <h1 className="fs-3 fw-normal">Registration</h1>
          <Form.Group controlId="sign-in-username" className="mb-2">
            <Form.Control type="text" size="lg" placeholder="User Name" autoComplete="" className="position-relative"  />
          </Form.Group>
          <Form.Group controlId="sign-in-email-address" className="mb-2">
            <Form.Control type="email" size="lg" placeholder="Email address" autoComplete="username" className="position-relative"  />
          </Form.Group>
          <Form.Group controlId="sign-in-password" className="mb-3">
            <Form.Control type="password" size="lg" placeholder="Password" autoComplete="current-password" className="position-relative"  />
          </Form.Group>
          
          <div className="d-grid">
          
          <Button variant="outline-secondary" type="button" size="lg" className="w-100">Register</Button>
          <Button href="#signup" variant="outline-primary" type="submit" size="sm" className="w-100">Back to sign in</Button>
          
          </div>
          
      </Form>
    </Container>

            
       
    );
}
     
