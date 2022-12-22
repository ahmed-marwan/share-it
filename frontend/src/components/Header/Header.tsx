import { Navbar, Container, Nav } from 'react-bootstrap';
function Header() {
  return (
    <header>
      <Navbar bg="primary" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Share It</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart">
                <span
                  className="fas fa-shopping-cart pe-1"
                  aria-hidden="true"
                ></span>
                Cart
              </Nav.Link>
              <Nav.Link href="/login">
                <span className="fas fa-user pe-1" aria-hidden="true"></span>
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
