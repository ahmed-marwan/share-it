import { Request, Response } from 'express';
import Product from '../models/Product/Product';
import CustomError from '../errors';

const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.json({ length: products.length, products });
};

const getSingleProduct = async (req: Request, res: Response) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new CustomError.NotFoundError(
      `No product with id: ${req.params.id}.`
    );
  }

  res.json({ product });
};

export { createProduct, getAllProducts, getSingleProduct };