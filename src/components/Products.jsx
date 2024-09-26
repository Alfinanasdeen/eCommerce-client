import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product.jsx"; // Ensure this path is correct
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters = {}, token }) => {
  console.log("Received Token in Products:", token);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        console.error("No token provided."); // Ensure there's a token
        setLoading(false);
        return; // Exit if no token
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/products?category=${cat}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cat, token]);

  // Filter products based on the fetched data and applied filters
  const filteredProducts = products.filter((item) => {
    const categoryMatch = item.categories.includes(cat);

    const filterMatches = Object.keys(filters).every((key) => {
      return item.filters && item.filters[key] === filters[key]; // Ensure filters exist
    });

    return categoryMatch && filterMatches;
  });

  if (loading) return <p>Loading products...</p>;

  return (
    <Container>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => <Product item={item} key={item._id} />)
      ) : (
        <p>No products found for the selected filters.</p>
      )}
    </Container>
  );
};

export default Products;
