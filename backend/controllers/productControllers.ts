import { Request, Response } from 'express';
import Product from '../models/Product/Product';
import CustomError from '../errors';
import { AuthUser } from '../middlewares/auth/auth.model';

const createProduct = async (req: AuthUser, res: Response) => {
  const product = await Product.create({ ...req.body, owner: req.user!._id });
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
      `Not found: no product with id ${req.params.id}.`
    );
  }

  res.json({ product });
};

const getCurrentUserProducts = async (req: AuthUser, res: Response) => {
  const products = await Product.find({ owner: req.user!._id });

  res.json({ length: products.length, products });
};

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getCurrentUserProducts,
};