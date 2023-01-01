import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AppDispatch, RootState } from '../../state/store';
import { logoutUser } from '../../state/features/logoutSlice/logoutSlice';
import { LoginState } from '../../state/features/loginSlice/loginSlice.model';

function Header() {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector<RootState, LoginState>((state) => state.user);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <header>
      <Navbar className="navbar-dark bg-dark" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Share It</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <span
                    className="fas fa-shopping-cart pe-1"
                    aria-hidden="true"
                  ></span>
                  Cart
                </Nav.Link>
              </LinkContainer>

              {user ? (
                <NavDropdown title={user.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <span
                      className="fas fa-user pe-1"
                      aria-hidden="true"
                    ></span>
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
