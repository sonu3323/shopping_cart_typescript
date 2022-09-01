import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import './Application.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Store from './Pages/Store';
import { Container } from 'react-bootstrap';
import NavbarComponent from './Pages/Navbar';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

const Application: React.FC = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <Container className='mb-4'>
          <NavbarComponent />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/store' element={<Store />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default hot(module)(Application);
