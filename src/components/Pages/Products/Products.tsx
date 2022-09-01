import React from 'react';
import { Product } from '../../data/type';
import SingleProduct from './SingleProduct';

interface Props {
  products: Product[];
}

const Products = ({ products }: Props) => {
  console.log(products);
  return (
    <div className='row mx-auto mt-2'>
        {products.map(product =>  <SingleProduct 
         product={product}
        />)}
      {/* <SingleProduct /> */}
    </div>
  );
};

export default Products;


