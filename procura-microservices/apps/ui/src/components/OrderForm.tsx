import React, { useState } from 'react';

const OrderForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleProductSelection = (product) => {
        setSelectedProducts((prev) => [...prev, product]);
        setTotalAmount((prev) => prev + product.rate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            customer: {
                name: customerName,
                phone: customerPhone,
            },
            products: selectedProducts,
            totalAmount,
        };

        // Call API to create order
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                // Handle successful order creation
                console.log('Order created successfully');
            } else {
                // Handle error
                console.error('Failed to create order');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
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