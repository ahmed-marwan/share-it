import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Header />

      <main className="py-3">
        <Container>
          <h1>Welcome To Share It</h1>
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default App;
