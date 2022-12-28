import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { AppDispatch, RootState } from '../../state/store';
import { fetchProductDetails } from '../../state/features/productDetailsSlice/productDetailsSlice';
import { ProductDetailsState } from '../../state/features/productDetailsSlice/productDetailsSlice.model';
import Spinner from '../../components/Spinner/Spinner';
import Message from '../../components/Message/Message';

function ProductPage() {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { status, product, error } = useSelector<
    RootState,
    ProductDetailsState
  >((state) => state.productDetails);

  useEffect(() => {
    dispatch(fetchProductDetails(params.id));
  }, [params.id, dispatch]);

  return (
    <>
      <Link className="btn btn-primary my-3" to="/">
        Go Back
      </Link>

      {status === 'loading' ? (
        <Spinner />
      ) : status === 'succeeded' ? (
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
      ) : (
        status === 'failed' && <Message variant="danger">{error}</Message>
      )}
    </>
  );
}

export default ProductPage;
