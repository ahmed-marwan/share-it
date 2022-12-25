import { Request, Response } from 'express';
import { products } from '../data/products';

const getAllProducts = (req: Request, res: Response) => {
  res.json({ length: products.length, products });
};

const getSingleProduct = (req: Request, res: Response) => {
  const product = products.find((product) => product._id === req.params.id);

  res.json({ product });
};

export {
  getAllProducts,
  getSingleProduct,
};
