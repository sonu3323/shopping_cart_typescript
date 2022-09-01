import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Badge, Offcanvas } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';

function NavbarComponent() {
  const [show, setShow] = useState<boolean>(false);
  const { cartQuantity, cartItems, decreaseCartQuantity } = useShoppingCart();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar sticky='top' bg='light' variant='light' className='shadow-sm'>
        <Container>
          <Navbar.Brand as={NavLink} to='/'>
            Home
          </Navbar.Brand>
          <Nav className='ms-auto'>
            <Nav.Link to='/store' as={NavLink}>
              Store
            </Nav.Link>
            <Nav.Link to='/about' as={NavLink}>
              About
            </Nav.Link>

            {cartQuantity > 0 && (
              <Button onClick={handleShow} variant='outline' className=''>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-cart text-success '
                  viewBox='0 0 16 16'
                >
                  {' '}
                  <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />{' '}
                </svg>

                <Badge bg='secondary ms-2'>{cartQuantity}</Badge>
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Offcanvas placement='end' show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton className='shadow-sm'>
          <Offcanvas.Title>CART {cartQuantity}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems?.map((product) => (
            <div className='d-flex justify-content-between shadow-lg my-1 p-1'>
              <div>
                <img
                  width={'100px'}
                  height={'100px'}
                  src={product.thumbnail}
                  alt=''
                />
              </div>

              <div className='d-flex justify-content-between flex-grow-1 align-items-center mx-1'>
                <div>
                  <p className='m-0 fw-bold'> {product.title}</p>
                  <span>quantity: {product.quantity}</span>
                </div>
                <div className='d-flex align-items-center'>
                  <p className='fw-bold'>
                    &#x20b9; {product.price * product.quantity}
                  </p>
                  <p
                    onClick={() => decreaseCartQuantity(product.id)}
                    className='mx-2'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      height='15pt'
                      viewBox='0 0 329.26933 329'
                      width='15pt'
                    >
                      <path d='m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0' />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className='mt-3'>
            {cartItems.length > 0 && (
              <h4 className='text-end'>
                Total: &#x20b9;
                {cartItems.reduce((acc, curr) => {
                  acc = curr.price * curr.quantity + acc;

                  return acc;
                }, 0)}
              </h4>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavbarComponent;
