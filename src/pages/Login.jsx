import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Import Firebase Auth
import { useNavigate } from "react-router-dom"; // If using React Router
import { Form, Button, Container, Alert } from "react-bootstrap"; // Bootstrap
import login from '../assets/OQ.png'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to homepage after login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <Container className="loginContainer">
      <div className="loginDiv" style={{boxShadow:'0px 0px 50px black'}}>
        <div className="d-flex align-items-center justify-content-center flex-column">
         <img className="m-3" src={login} alt="" width={'70px'}/>   <h1 style={{fontWeight:'100'}}>Oqulix CRM</h1></div>

        <h2 className="text-center">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
