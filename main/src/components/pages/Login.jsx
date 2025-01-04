import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login () {
    return (
      <Container id="login-container" className="d-grid h-100">
      <Form id="sign-in-form" className="text-center w-100">
        <img
          className="mb-4 bootstrap-logo"
          src="https://static.vecteezy.com/system/resources/previews/023/288/132/non_2x/angry-dragon-logo-design-modern-game-style-simple-illustration-vector.jpg"
          alt="Bootstrap logo" />
          <h1 className="fs-3 fw-normal">Please sign in</h1>
          <Form.Group controlId="sign-in-email-address" class="mb-2">
            <Form.Control type="email" size="lg" placeholder="Email address" autoComplete="username" className="position-relative"  />
          </Form.Group>
          <Form.Group controlId="sign-in-password" class="mb-3">
            <Form.Control type="password" size="lg" placeholder="Password" autoComplete="current-password" className="position-relative"  />
          </Form.Group>
          <Form.Group  controlId="remember-me" className="d-flex justify-content-center mb-4">
            <Form.Check  label="Remember me" />
          </Form.Group>
          <div className="d-grid">
          <Button variant="outline-primary" type="submit" size="lg" className="w-100">Sign in</Button>
          </div>
      </Form>
    </Container>

            
       
    );
}
     