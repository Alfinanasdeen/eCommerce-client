import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product.jsx";
import axios from "axios";
import PropTypes from "prop-types";
//import SEARCH from "./Search.jsx";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters = {}, token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const url = cat
          ? `${import.meta.env.VITE_API_BASE_URL}/api/products?category=${cat}`
          : `${import.meta.env.VITE_API_BASE_URL}/api/products`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cat, token]);

  const filteredProducts = products.filter((item) => {
    const categoryMatch = item.categories.includes(cat);
    const filterMatches = Object.keys(filters).every((key) => {
      return item.filters && item.filters[key] === filters[key];
    });

    return categoryMatch && filterMatches;
  });

  if (loading) return <p>Loading products...</p>;

  return (
    <Container>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => <Product item={item} key={item._id} />)
      ) : (
        <p></p>
      )}
    </Container>
  );
};

Products.propTypes = {
  cat: PropTypes.string,
  filters: PropTypes.object,
  token: PropTypes.string,
};

export default Products;
