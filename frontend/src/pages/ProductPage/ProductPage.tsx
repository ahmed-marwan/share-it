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
import { products } from '../../products';

function ProductPage() {
  const params = useParams();
  const selectedProduct = products.find((product) => product._id === params.id);
  const condition =
    selectedProduct!.condition[0].toUpperCase() +
    selectedProduct!.condition.substring(1);

  return (
    <>
      <Link className="btn btn-primary my-3" to="/">
        Go Back
      </Link>

      <Row>
        <Col md={4}>
          <Image
            src={selectedProduct?.image}
            alt={selectedProduct?.name}
            fluid
          />
        </Col>

        <Col md={5}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>{selectedProduct?.name}</h2>
            </ListGroupItem>

            <ListGroupItem className="space-between">
              <span>{condition}</span>
              <span>To {selectedProduct?.typeOfShare}</span>
            </ListGroupItem>

            <ListGroupItem>
              <h5>About Product</h5>
              {selectedProduct?.description}
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>{selectedProduct?.status}</Col>
                </Row>
              </ListGroupItem>

              {selectedProduct?.status === 'borrowed' && (
                <ListGroupItem>
                  <Row>
                    <Col>Expected Return Date:</Col>
                    <Col>{selectedProduct?.expectedReturnDate}</Col>
                  </Row>
                </ListGroupItem>
              )}

              <ListGroupItem className="mx-auto">
                <Button disabled={selectedProduct?.status !== 'available'}>
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
