import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../../components/Product/Product';
import Spinner from '../../components/Spinner/Spinner';
import Message from '../../components/Message/Message';
import { AppDispatch, RootState } from '../../state/store';
import { fetchProducts } from '../../state/features/productsSlice/productsSlice';
import { ProductsState } from '../../state/features/productsSlice/productsSlice.model';

function HomePage() {
  const dispatch: AppDispatch = useDispatch();
  const { status, products, error } = useSelector<RootState, ProductsState>(
    (state) => state.productsList
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  let content: JSX.Element[] | JSX.Element | undefined;
  if (status === 'loading') {
    content = <Spinner />;
  } else if (status === 'succeeded') {
    content = (
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product key={product._id} product={product} />
          </Col>
        ))}
      </Row>
    );
  } else if (status === 'failed') {
    content = <Message variant="danger">{error}</Message>;
  }

  return (
    <>
      <h1>Latest Products</h1>
      {content}
    </>
  );
}

export default HomePage;
