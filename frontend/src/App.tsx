import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <>
      <Header />

      <main className="py-3">
        <Container>
          <HomePage />
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default App;
