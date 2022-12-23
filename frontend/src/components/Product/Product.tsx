import { Card } from 'react-bootstrap';
import { IProduct } from './product.model';

function Product({ product }: { product: IProduct }) {
  return (
    <Card className="my-3 p-3">
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} className="img" />
      </a>

      <Card.Body>
        <Card.Title>
          <strong>{product.name}</strong>
        </Card.Title>

        <Card.Text>To {product.typeOfShare}</Card.Text>
        <Card.Text>{product.condition}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
