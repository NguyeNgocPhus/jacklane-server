import { UserRepository } from './user.repository';
import { TypeProductRepository } from './type-product.repository';
import { ProductRepository } from './product.repository';
import { ProductDetailRepository } from './product-detail.repository';
import { ProductImageRepository } from './product-image.repository';
import { CartRepository } from './cart.repository';


export const Repositories = [
  UserRepository
  , TypeProductRepository
  , ProductRepository
  , ProductDetailRepository
  , ProductImageRepository,
  CartRepository
];