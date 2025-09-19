import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  productCode: string;
  productName: string;
  productRate: number;
  productImage?: string;
}

interface OrderFormProps {
  onOrderComplete?: () => void;
}

interface OrderProduct {
  productId: number;
  quantity: number;
}

const NewOrderForm: React.FC<OrderFormProps> = ({ onOrderComplete }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([]);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [selectedProducts]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products', {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY
        }
      });
      setAvailableProducts(response.data);
    } catch (err) {
      setError('Failed to load products. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductSelection = (productId: number, quantity: number) => {
    setSelectedProducts(prev => {
      const existing = prev.find(p => p.productId === productId);
      if (existing) {
        if (quantity <= 0) {
          return prev.filter(p => p.productId !== productId);
        }
        return prev.map(p =>
          p.productId === productId ? { ...p, quantity } : p
        );
      }
      if (quantity <= 0) return prev;
      return [...prev, { productId, quantity }];
    });
  };

  const calculateTotal = () => {
    const total = selectedProducts.reduce((sum, { productId, quantity }) => {
      const product = availableProducts.find(p => p.id === productId);
      return sum + (product ? product.productRate * quantity : 0);
    }, 0);
    setTotalAmount(total);
  };

  const validateForm = (): boolean => {
    if (!customerName.trim()) {
      setError('Customer name is required');
      return false;
    }
    if (!customerPhone.trim()) {
      setError('Customer phone is required');
      return false;
    }
    if (!/^\d{10}$/.test(customerPhone.trim())) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    if (selectedProducts.length === 0) {
      setError('Please select at least one product');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    const orderData = {
      customerDetails: {
        name: customerName.trim(),
        phone: customerPhone.trim(),
      },
      products: selectedProducts,
      totalAmount,
    };

    try {
      const response = await axios.post('/api/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      });

      if (response.status === 201) {
        setCustomerName('');
        setCustomerPhone('');
        setSelectedProducts([]);
        setTotalAmount(0);
        
        if (onOrderComplete) {
          onOrderComplete();
        }
      }
    } catch (err) {
      setError('Failed to create order. Please try again.');
      console.error('Order creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading products...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="customerPhone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="10 digit number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Products</h3>
        <div className="grid gap-4">
          {availableProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{product.productName}</h4>
                <p className="text-sm text-gray-500">{product.productCode}</p>
                <p className="text-blue-600">₹{product.productRate.toFixed(2)}</p>
              </div>
              <div className="w-24">
                <input
                  type="number"
                  min="0"
                  value={selectedProducts.find(p => p.productId === product.id)?.quantity || ''}
                  onChange={(e) => handleProductSelection(product.id, parseInt(e.target.value) || 0)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Qty"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="text-xl font-semibold text-right">
          Total: ₹{totalAmount.toFixed(2)}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-md text-white font-medium ${
            isSubmitting
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Creating Order...' : 'Create Order'}
        </button>
      </div>
    </form>
  );
};

export default NewOrderForm;