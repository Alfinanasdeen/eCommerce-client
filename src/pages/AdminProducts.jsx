// AdminProducts.jsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductItem = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
`;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/admin/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching admin products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  if (loading) return <p>Loading products...</p>;

  return (
    <Container>
      <Title>My Products</Title>
      <ProductList>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem key={product._id}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              {/* Add more product details as needed */}
            </ProductItem>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </ProductList>
    </Container>
  );
};

export default AdminProducts;
