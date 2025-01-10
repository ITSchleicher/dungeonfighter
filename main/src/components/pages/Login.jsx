import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Validation from './LoginValidation';

export default function Login({ handlePageChange }) {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Only proceed if no validation errors
    if (Object.keys(errors).length === 0) {
      setLoading(true); // Show loading state while request is made
      try {
        // Send POST request to backend
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Login successful!');
          sessionStorage.setItem('jwt_token', data.token);
            console.log('Login successful, token stored in session storage:', data.token);
          handlePageChange('Home')
        } else {
          alert(data.error || 'Invalid login credentials');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong! Please try again.');
      } finally {
        setLoading(false); // Remove loading state
      }
    }
  };

  return (
    <Container id="login-container" className="d-grid h-100">
      <Form id="sign-in-form" className="text-center w-100" onSubmit={handleSubmit}>
        <img
          className="mb-4 bootstrap-logo"
          src="https://i.pinimg.com/736x/ae/7c/ae/ae7caeb388343825b9d01eed51d09aab.jpg"
          alt="Bootstrap logo"
        />
        <h1 className="fs-3 fw-normal">Please sign in</h1>
        <Form.Group controlId="sign-in-email-address" className="mb-2">
          <Form.Control
            type="email"
            size="lg"
            placeholder="Email address"
            name="email"
            autoComplete="username"
            onChange={handleInput}
            className="position-relative"
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </Form.Group>
        <Form.Group controlId="sign-in-password" className="mb-3">
          <Form.Control
            type="password"
            size="lg"
            placeholder="Password"
            name="password"
            autoComplete="current-password"
            onChange={handleInput}
            className="position-relative"
          />
          {errors.password && <span className="text-danger">{errors.password}</span>}
        </Form.Group>
        <Form.Group controlId="remember-me" className="d-flex justify-content-center mb-4">
          <Form.Check label="Remember me" />
        </Form.Group>
        <div className="d-grid">
          <Button variant="outline-primary" type="submit" size="lg" className="w-100" >
            Sign in
          </Button>
          <Button
            variant="outline-secondary"
            type="button"
            size="sm"
            onClick={() => handlePageChange('Signup')}
            className="w-100"
          >
            Register
          </Button>
        </div>
      </Form>
    </Container>
  );
}





          // <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      //   <div className='bg-white p-3 rounded w-25'>
      //       <h2>Sign-In</h2>
      //       <form action="" onSubmit={handleSubmit}>
      //           <div className='mb-3'>
      //               <label htmlFor="email"><strong>Email</strong></label>
      //               <input type="email" placeholder="Enter Email" name="email" onChange={handleInput} classname='form-control rounded-0'/>
      //               {errors.email && <span className='text-danger'> {errors.email}</span>}
      //           </div>
      //           <div className='mb-3'>
      //               <label htmlFor="password"><strong>Password</strong></label>
      //               <input type="password" placeholder="Enter Password" name="password" onChange={handleInput} classname='form-control rounded-0'/>
      //               {errors.password && <span className='text-danger'> {errors.password}</span>}
      //           </div>
      //           <button className='btn btn-success w-100 rounded-0'> Sign up</button>
      //           {/* <Link to="/components/pages/Login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link> */}
                
      //       </form>
      //   </div>
      // </div>
