import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../../components/Product/Product';
import { IProduct } from '../../shared/models/product.model';

function HomePage() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get<{
        length: number;
        products: IProduct[];
      }>('/api/v1/products');

      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>

      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product key={product._id} product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default HomePage;
