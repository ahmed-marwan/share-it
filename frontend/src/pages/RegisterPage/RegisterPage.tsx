import { useRef, useEffect, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { AppDispatch, RootState } from '../../state/store';
import { registerUser } from '../../state/features/registerSlice/registerSlice';
import { RegisterState } from '../../state/features/registerSlice/registerSlice.model';
import FormContainer from '../../components/FormContainer/FormContainer';
import Message from '../../components/Message/Message';
import Spinner from '../../components/Spinner/Spinner';

function RegisterPage() {
  const [passwordsMismatchMsg, setPasswordsMismatchMsg] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const { status, user, error } = useSelector<RootState, RegisterState>(
    (state) => state.registerUser
  );

  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  useEffect(() => {
    nameRef.current!.focus();
  }, []);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordRef.current!.value === confirmPasswordRef.current!.value) {
      dispatch(
        registerUser({
          name: nameRef.current!.value,
          email: emailRef.current!.value,
          password: passwordRef.current!.value,
        })
      );

      setPasswordsMismatchMsg('');
    } else {
      setPasswordsMismatchMsg('Passwords do not match.');
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>

      {status === 'loading' && <Spinner />}
      {error && <Message variant="danger">{error}</Message>}
      {passwordsMismatchMsg && (
        <Message variant="danger">{passwordsMismatchMsg}</Message>
      )}

      <Form onSubmit={submitHandler}>
        <FormGroup controlId="name" className="my-2">
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            ref={nameRef}
            placeholder="Enter name"
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="email" className="my-2">
          <FormLabel>Email address</FormLabel>
          <FormControl
            type="email"
            ref={emailRef}
            placeholder="Enter email"
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="password" className="mb-3">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            ref={passwordRef}
            placeholder="Enter password"
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="confirmPassword" className="mb-3">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            ref={confirmPasswordRef}
            placeholder="Confirm password"
          ></FormControl>
        </FormGroup>

        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="my-2">
        <Col>
          <span className="me-2">Have an Account?</span>
          <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterPage;