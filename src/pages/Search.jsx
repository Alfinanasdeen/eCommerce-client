import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const ProductCard = styled.div`
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px; /* Set a fixed height */
  object-fit: cover; /* Ensures the image covers the area without distortion */
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ProductTitle = styled.h2`
  font-size: 18px;
  margin: 10px 0;
`;

const ProductDesc = styled.p`
  font-size: 14px;
  color: #666;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

// Main Search component
const Search = () => {
  const [data, setData] = useState([]); // All products data
  const [filteredData, setFilteredData] = useState([]); // For filtered products
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch all products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`,
        {
          headers: {
            Authorization: token ? token : "", // Include token in the headers
          },
        }
      );
      console.log("Fetched products:", response.data); // Log the response for debugging
      setData(response.data); // Set all products to data
      setFilteredData(response.data); // Initially set filteredData to all products
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // Fetch all products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle search change and filtering
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      const lowerTerm = term.toLowerCase();
      const filtered = data.filter((product) =>
        product.title.toLowerCase().includes(lowerTerm)
      );
      console.log("Filtered products:", filtered); 
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <ProductList>
        {filteredData.length > 0 ? (
          filteredData.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <ProductCard>
                <ProductImage src={product.img} alt={product.title} />
                <ProductTitle>{product.title}</ProductTitle>
                <ProductDesc>{product.desc}</ProductDesc>
                <ProductPrice>Price: ${product.price}</ProductPrice>
              </ProductCard>
            </Link>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </ProductList>
    </Container>
  );
};

export default Search;
