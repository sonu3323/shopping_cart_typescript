import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import fetchData from '../data/apiData';
import { Product } from '../data/type';
import Products from './Products/Products';

const Home = () => {
  const { products } = useShoppingCart();

  console.log(products);

  return (
    <Container className='m-2'>
      <Products products={products} />
    </Container>
  );
};

export default Home;
