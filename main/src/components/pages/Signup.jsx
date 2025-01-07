import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Validation from './SignupValidation'; // Import validation logic

export default function Signup({ handlePageChange }) {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values)); // Apply validation

    if (Object.keys(errors).length === 0) {
      try {
        // Send POST request to backend
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Registration successful!');
          // Optionally redirect or reset the form
        } else {
          alert(data.error); // Show error message
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong!');
      }
    }
  };

  return (
    <Container id="login-container" className="d-grid h-100">
      <Form id="sign-in-form" className="text-center w-100" action="" onSubmit={handleSubmit}>
        <h1 className="fs-3 fw-normal">Registration</h1>
        <Form.Group controlId="sign-in-username" className="mb-2">
          <Form.Control
            type="text"
            size="lg"
            placeholder="User Name"
            name="username"
            onChange={handleInput}
          />
          {errors.username && <span className="text-danger">{errors.username}</span>}
        </Form.Group>
        <Form.Group controlId="sign-in-email-address" className="mb-2">
          <Form.Control
            type="email"
            size="lg"
            placeholder="Email address"
            name="email"
            onChange={handleInput}
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </Form.Group>
        <Form.Group controlId="sign-in-password" className="mb-3">
          <Form.Control
            type="password"
            size="lg"
            placeholder="Password"
            name="password"
            onChange={handleInput}
          />
          {errors.password && <span className="text-danger">{errors.password}</span>}
        </Form.Group>
        <Button variant="outline-secondary" type="submit" size="lg" className="w-100">
          Register
        </Button>
        <Button
          variant="outline-primary"
          type="button"
          size="sm"
          onClick={() => handlePageChange('Login')}
          className="w-100"
        >
          Back to sign in
        </Button>
      </Form>
    </Container>
  );
}
