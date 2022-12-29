import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
} from 'react-bootstrap';
import { RootState } from '../../state/store';
import { removeFromCart } from '../../state/features/cartSlice/cartSlice';
import { CartState } from '../../state/features/cartSlice/cartSlice.model';
import Message from '../../components/Message/Message';
import CartItem from '../../components/CartItem/CartItem';

function CartPage() {
  const dispatch = useDispatch();
  const { cartItems, cartItemsNumber } = useSelector<RootState, CartState>(
    (state) => state.cartItems
  );

  const removeCartItemHandler = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const checkoutHandler = () => {};

  return (
    <Row>
      <Col md={7}>
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty!
            <Link to="/" className="ms-2">
              Go Back
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                removeItemHandler={removeCartItemHandler}
              />
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={3}>
        <Card>
          <ListGroup variant="flush" className="mx-auto">
            <ListGroupItem>
              <h2>Total items: {cartItemsNumber}</h2>
            </ListGroupItem>

            <ListGroupItem className="mx-auto">
              <Button
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartPage;