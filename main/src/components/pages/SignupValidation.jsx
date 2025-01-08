function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  // Check if username is empty
  if (values.username === '') {
    error.username = 'Username is required'; 
  } else {
    error.username = '';
  }

  // Check if email is empty or invalid
  if (values.email === '') {
    error.email = 'Email is required';
  } else if (!email_pattern.test(values.email)) {
    error.email = 'Email is invalid';
  } else {
    error.email = '';
  }

  // Check if password is empty or invalid
  if (values.password === '') {
    error.password = 'Password is required';
  } else if (!password_pattern.test(values.password)) {
    error.password = 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number';
  } else {
    error.password = '';
  }

  return error;
}

export default Validation;
