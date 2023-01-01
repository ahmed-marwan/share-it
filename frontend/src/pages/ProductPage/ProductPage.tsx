import { useEffect, useState } from 'react';
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
import { addToCart } from '../../state/features/cartSlice/cartSlice';
import {
  CartItem,
  CartState,
} from '../../state/features/cartSlice/cartSlice.model';

function ProductPage() {
  const [isItemRequested, setIsItemRequested] = useState(false);
  const params = useParams();

  const dispatch: AppDispatch = useDispatch();
  const { status, product, error } = useSelector<
    RootState,
    ProductDetailsState
  >((state) => state.productDetails);

  const { cartItems } = useSelector<RootState, CartState>(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchProductDetails(params.id));
  }, [params.id, dispatch]);

  useEffect(() => {
    const matchedCartItem = cartItems.find((item) => item._id === params.id);

    if (matchedCartItem !== undefined) {
      setIsItemRequested(true);
    }
  }, [cartItems, params.id]);

  const addToCartHandler = (cartItem: CartItem) => {
    if (!isItemRequested) {
      dispatch(addToCart(cartItem));
    }
  };

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

              <ListGroupItem className="d-flex justify-content-between">
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
                  <Button
                    disabled={
                      product?.status !== 'available' || isItemRequested
                    }
                    onClick={() =>
                      addToCartHandler({
                        _id: product!._id,
                        name: product!.name,
                        image: product!.image,
                        status: 'requested',
                        requestStatus: 'pending',
                      })
                    }
                  >
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
