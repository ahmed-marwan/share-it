import { Card } from 'react-bootstrap';
import { IProduct } from './product.model';
import { Link } from 'react-router-dom';

function Product({ product }: { product: IProduct }) {
  return (
    <Card className="my-3 p-3">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} className="img" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text>To {product.typeOfShare}</Card.Text>
        <Card.Text>{product.condition}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
