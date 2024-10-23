import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #333;
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100px; /* Fixed width */
  height: 100px; /* Fixed height */
  object-fit: cover; /* Maintain aspect ratio, cover the area */
  border-radius: 4px;
  margin-right: 15px;
`;

const ProductDetails = styled.div`
  flex-grow: 1; /* Allow the details section to grow */
`;

const ProductTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const DeleteButton = styled.button`
  background-color: teal;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const NoProductsMessage = styled.p`
  text-align: center;
  color: #666;
`;

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token"); // Ensure token exists
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      setProducts(response.data); // Set the products in state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Check if the token is available

      await axios.delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/products/admin/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token
          },
        }
      );
      console.log("Product deleted successfully");
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  return (
    <Container>
      <Title>Product List</Title>
      {products.length === 0 ? (
        <NoProductsMessage>No products available</NoProductsMessage>
      ) : (
        <ProductList>
          {products.map((product) => (
            <ProductItem key={product._id}>
              <ProductImage src={product.img} alt={product.title} />
              <ProductDetails>
                <ProductTitle>{product.title}</ProductTitle>
              </ProductDetails>
              <DeleteButton onClick={() => deleteProduct(product._id)}>
                Delete
              </DeleteButton>
            </ProductItem>
          ))}
        </ProductList>
      )}
    </Container>
  );
};

export default DeleteProduct;
