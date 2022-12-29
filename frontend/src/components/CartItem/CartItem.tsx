import { Link } from 'react-router-dom';
import { Button, Col, Image, ListGroupItem, Row } from 'react-bootstrap';
import { CartItem as ICartItem } from '../../state/features/cartSlice/cartSlice.model';

function CartItem({
  item,
  removeItemHandler,
}: {
  item: ICartItem;
  removeItemHandler: (itemId: string) => void;
}) {
  return (
    <ListGroupItem key={item._id}>
      <Row>
        <Col md={2}>
          <Image src={item.image} alt={item.name} fluid rounded />
        </Col>

        <Col md={3}>
          <Link to={`/products/${item._id}`}>{item.name}</Link>
        </Col>

        <Col md={3}>Request Status: {item.requestStatus}</Col>

        <Col md={2}>
          <Button variant="light" onClick={() => removeItemHandler(item._id)}>
            <span className="fas fa-trash" aria-hidden="true"></span>
            <span className="sr-only">Remove cart item</span>
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  );
}

export default CartItem;