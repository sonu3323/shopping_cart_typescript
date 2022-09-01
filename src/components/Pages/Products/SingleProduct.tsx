import { useShoppingCart } from '@src/components/context/ShoppingCartContext';
import { Product } from '@src/components/data/type';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface Props {
  product: Product;
}

function SignleProdcut({ product }: Props) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(product.id);

  console.log(quantity);

  const handleCartButton = (e: any, id: number) => {
    e.stopPropagation();
    console.log('Click');
    increaseCartQuantity(id);
  };

  return (
    <div className='col-lg-3 col-md-6 col-sm-12'>
      <Card style={{ width: '18rem' }} className=' mb-3 bg-white shadow-sm'>
        <Card.Img
          className=''
          width={'200px'}
          height={'200px'}
          variant='top'
          src={product.thumbnail}
        />
        <Card.Body className='my-auto'>
          <Card.Title>
            {product.title} <span className='ms-auto'>&#x20b9;{product.price}</span>
          </Card.Title>
          <Card.Text>{product.description.substring(0, 50)} ...</Card.Text>
        </Card.Body>
        {quantity ? (
          <div className='btn-group' role='group' aria-label='Basic example'>
            <button
              onClick={() => increaseCartQuantity(product.id)}
              type='button'
              className='btn btn-success'
            >
              add
            </button>
            <button type='button' className='btn btn-light'>
              {quantity}
            </button>
            <button
              onClick={() => decreaseCartQuantity(product.id)}
              type='button'
              className='btn btn-danger'
            >
              remvoe
            </button>
          </div>
        ) : (
          <Button
            onClick={(e) => handleCartButton(e, product.id)}
            variant='primary'
          >
            ADD TO CART
          </Button>
        )}
      </Card>
    </div>
  );
}

export default SignleProdcut;
