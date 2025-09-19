import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    productCode: string;
    productName: string;
    productRate: number;
}

interface OrderFormProps {
    onOrderComplete?: () => void;
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    productCode: string;
    productName: string;
    productRate: number;
}

interface OrderFormProps {
    onOrderComplete?: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onOrderComplete }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [selectedProducts, setSelectedProducts] = useState<Array<{ productId: number; quantity: number }>>([]);
    const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setAvailableProducts(response.data);
        } catch (error) {
            setError('Failed to load products');
        }
    };

    const handleProductSelection = (productId: number, quantity: number) => {
        const product = availableProducts.find(p => p.id === productId);
        if (!product) return;

        setSelectedProducts(prev => {
            const existingProduct = prev.find(p => p.productId === productId);
            if (existingProduct) {
                return prev.map(p => 
                    p.productId === productId 
                        ? { ...p, quantity } 
                        : p
                );
            }
            return [...prev, { productId, quantity }];
        });

        calculateTotal();
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
                name: customerName,
                phone: customerPhone,
            },
            products: selectedProducts,
            totalAmount,
        };

        try {
            const response = await axios.post('/api/orders', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                // Reset form
                setCustomerName('');
                setCustomerPhone('');
                setSelectedProducts([]);
                setTotalAmount(0);
                setError('');
                
                if (onOrderComplete) {
                    onOrderComplete();
                }
            }
        } catch (error) {
            setError('Failed to create order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            <div
                <label>
                    Customer Name:
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Customer Phone:
                    <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <h3>Selected Products:</h3>
                {selectedProducts.map((product, index) => (
                    <div key={index}>
                        <span>{product.name} - ${product.rate}</span>
                    </div>
                ))}
            </div>
            <div>
                <h4>Total Amount: ${totalAmount}</h4>
            </div>
            <button type="submit">Submit Order</button>
        </form>
    );
};

export default OrderForm;