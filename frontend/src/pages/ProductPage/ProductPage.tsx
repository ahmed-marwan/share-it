import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import { IProduct } from '../../shared/models/product.model';

function ProductPage() {
  const [product, setProduct] = useState<IProduct>();
  const params = useParams();

  useEffect(() => {
    const fetchSingleProduct = async () => {
      const { data } = await axios.get<{ product: IProduct }>(
        `/api/v1/products/${params.id}`
      );

      setProduct(data.product);
    };

    fetchSingleProduct();
  }, [params.id]);

  return (
    <>
      <Link className="btn btn-primary my-3" to="/">
        Go Back
      </Link>

      <Row>
        <Col md={4}>
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>

        <Col md={5}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>{product?.name}</h2>
            </ListGroupItem>

            <ListGroupItem className="space-between">
              <span>{product?.condition}</span>
              <span>To {product?.typeOfShare}</span>
            </ListGroupItem>

            <ListGroupItem>
              <h5>About Product</h5>
              {product?.description}
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product?.status}</Col>
                </Row>
              </ListGroupItem>

              {product?.status === 'borrowed' && (
                <ListGroupItem>
                  <Row>
                    <Col>Expected Return Date:</Col>
                    <Col>{product?.expectedReturnDate}</Col>
                  </Row>
                </ListGroupItem>
              )}

              <ListGroupItem className="mx-auto">
                <Button disabled={product?.status !== 'available'}>
                  Add To Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProductPage;
