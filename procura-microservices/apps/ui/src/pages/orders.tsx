import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderForm from '../components/OrderForm';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      <OrderForm />
      <h2>Order List</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>Order ID:</strong> {order.id} <br />
            <strong>Customer:</strong> {order.customer.name} <br />
            <strong>Phone:</strong> {order.customer.phone} <br />
            <strong>Total Amount:</strong> ${order.totalAmount} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;