import { useRef, useEffect, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from 'react-bootstrap';
import { AppDispatch, RootState } from '../../state/store';
import { getUserProfile } from '../../state/features/userProfileSlice/userProfileSlice';
import { UserProfileState } from '../../state/features/userProfileSlice/UserProfileSlice.model';
import Message from '../../components/Message/Message';
import Spinner from '../../components/Spinner/Spinner';
import { LoginState } from '../../state/features/loginSlice/loginSlice.model';
import { updateUserProfile } from '../../state/features/updateUserProfileSlice/updateUserProfileSlice';
import { UpdateUserProfileState } from '../../state/features/updateUserProfileSlice/updateUserProfileSlice.model';
import { updateUserPassword } from '../../state/features/updateUserPasswordSlice/updateUserPasswordSlice';
import { UpdateUserPasswordState } from '../../state/features/updateUserPasswordSlice/updateUserPasswordSlice.model';
import { CurrentUserProductsState } from '../../state/features/CurrentUserProducts/CurrentUserProducts.model';
import { getCurrentUserProducts } from '../../state/features/CurrentUserProducts/CurrentUserProductsSlice';

function UserProfilePage() {
  const [updatePassword, setUpdatePassword] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector<RootState, LoginState>(
    (state) => state.loginUser
  );

  const {
    status,
    profile,
    error: getProfileError,
  } = useSelector<RootState, UserProfileState>((state) => state.userProfile);

  const { status: updateProfileStatus, error: updateProfileError } =
    useSelector<RootState, UpdateUserProfileState>(
      (state) => state.updateUserProfile
    );

  const { status: updatePasswordStatus, error: updatePasswordError } =
    useSelector<RootState, UpdateUserPasswordState>(
      (state) => state.updateUserPassword
    );

  const {
    status: userProductsStatus,
    products,
    error: userProductsError,
  } = useSelector<RootState, CurrentUserProductsState>(
    (state) => state.userProducts
  );

  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      if (!profile) {
        dispatch(getUserProfile());
        dispatch(getCurrentUserProducts());
      } else {
        nameRef.current!.value = profile.name;
        emailRef.current!.value = profile.email;
      }
    }
  }, [dispatch, navigate, profile, user]);

  // TODO: Look for an alternative for the above nested if conditions
  //   useEffect(() => {
  //     if (!profile) {
  //       dispatch(getUserProfile());
  //       dispatch(getCurrentUserProducts());
  //     } else if (profile) {
  //       nameRef.current!.value = profile.name;
  //       emailRef.current!.value = profile.email;
  //     }
  //   }, [dispatch, navigate, user, profile]);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      nameRef.current!.value !== profile!.name ||
      emailRef.current!.value !== profile!.email
    ) {
      dispatch(
        updateUserProfile({
          name: nameRef.current!.value,
          email: emailRef.current!.value,
        })
      );
    }

    if (oldPasswordRef.current!.value && newPasswordRef.current!.value) {
      dispatch(
        updateUserPassword({
          oldPassword: oldPasswordRef.current!.value,
          newPassword: newPasswordRef.current!.value,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Profile</h2>

        {status === 'loading' && <Spinner />}
        {updateProfileStatus === 'succeeded' && (
          <Message variant="success">Profile Updated Successfully</Message>
        )}
        {updatePasswordStatus === 'succeeded' && (
          <Message variant="success">Password Updated Successfully</Message>
        )}

        {getProfileError ||
          updateProfileError ||
          (updatePasswordError && (
            <Message variant="danger">
              {getProfileError || updateProfileError || updatePasswordError}
            </Message>
          ))}

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

          <Form.Check
            type="switch"
            id="custom-switch"
            label="Update password"
            checked={updatePassword}
            onChange={() => setUpdatePassword(!updatePassword)}
            className="my-3"
          />

          {updatePassword ? (
            <>
              <FormGroup controlId="oldPassword" className="mb-3">
                <FormLabel>Old Password</FormLabel>
                <FormControl
                  type="password"
                  ref={oldPasswordRef}
                  placeholder="Enter old password"
                ></FormControl>
              </FormGroup>

              <FormGroup controlId="newPassword" className="mb-3">
                <FormLabel>New Password</FormLabel>
                <FormControl
                  type="password"
                  ref={newPasswordRef}
                  placeholder="Enter new password"
                ></FormControl>
              </FormGroup>
            </>
          ) : undefined}

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Products</h2>
        {userProductsStatus === 'loading' && <Spinner />}
        {userProductsError && (
          <Message variant="danger">{userProductsError}</Message>
        )}

        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type of Share</th>
              <th>Condition</th>
              <th>Status</th>
              <th>Uploaded In</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.typeOfShare}</td>
                <td>{product.condition}</td>
                <td>{product.status}</td>
                <td>{product.createdAt.substring(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default UserProfilePage;
