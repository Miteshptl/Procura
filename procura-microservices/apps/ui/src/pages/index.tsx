import React from 'react';
import Head from 'next/head';
import ProductList from '../components/ProductList';
import OrderForm from '../components/OrderForm';

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Procura Microservices</title>
        <meta name="description" content="Welcome to Procura Microservices" />
      </Head>
      <h1>Welcome to Procura Microservices</h1>
      <h2>Products</h2>
      <ProductList />
      <h2>Create Order</h2>
      <OrderForm />
    </div>
  );
};

export default HomePage;