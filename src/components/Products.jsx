import styled from "styled-components";
import Product from "./Product.jsx";
import { electronics } from "../data.js"; // Import your product data

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters = {}, }) => {
  // Default filters to an empty object
  const allProducts = electronics; // Assume you are working with the electronics category

  // Filter products based on the category
  const filteredProducts = allProducts.filter((item) => {
    const categoryMatch = item.categories.includes(cat);

    // Check if the item matches all selected filters
    const filterMatches = Object.keys(filters).every((key) => {
      return item.filters && item.filters[key] === filters[key]; // Ensure filters exist
    });

    return categoryMatch && filterMatches;
  });

  return (
    <Container>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => <Product item={item} key={item.id} />)
      ) : (
        <p>No products found for the selected filters.</p>
      )}
    </Container>
  );
};

export default Products;
