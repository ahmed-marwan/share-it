import { useRef, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
} from 'react-bootstrap';
import { AppDispatch, RootState } from '../../state/store';
import { loginUser } from '../../state/features/loginSlice/loginSlice';
import { LoginState } from '../../state/features/loginSlice/loginSlice.model';
import FormContainer from '../../components/FormContainer/FormContainer';
import Message from '../../components/Message/Message';
import Spinner from '../../components/Spinner/Spinner';

function LoginPage() {
  const dispatch: AppDispatch = useDispatch();
  const { status, user, error } = useSelector<RootState, LoginState>(
    (state) => state.loginUser
  );

  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  useEffect(() => {
    emailRef.current!.focus();
  }, []);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      loginUser({
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      })
    );

    passwordRef.current!.value = '';
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      {status === 'loading' && <Spinner />}
      {error && <Message variant="danger">{error}</Message>}

      <Form onSubmit={submitHandler}>
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

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="my-2">
        <Col>
          <span className="me-2">New User?</span>
          <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginPage;
