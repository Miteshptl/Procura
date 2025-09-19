import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map(product => (
                    <li key={product.productCode}>
                        <h2>{product.productName}</h2>
                        <p>{product.productDescription}</p>
                        <p>Price: ${product.productRate}</p>
                        {product.productImage && <img src={product.productImage} alt={product.productName} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;