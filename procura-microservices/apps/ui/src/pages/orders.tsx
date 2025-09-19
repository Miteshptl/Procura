import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewOrderForm from '../components/NewOrderForm';

interface CustomerDetails {
  name: string;
  phone: string;
}

interface OrderProduct {
  productId: number;
  quantity: number;
}

interface Order {
  id: number;
  customerDetails: CustomerDetails;
  products: OrderProduct[];
  totalAmount: number;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders', {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderComplete = () => {
    // Refresh orders list after new order is created
    fetchOrders();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>
      <NewOrderForm onOrderComplete={handleOrderComplete} />
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg p-4 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Order ID</p>
                  <p className="font-medium">{order.id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Customer</p>
                  <p className="font-medium">{order.customerDetails.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-medium">{order.customerDetails.phone}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Amount</p>
                  <p className="font-medium">₹{order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;