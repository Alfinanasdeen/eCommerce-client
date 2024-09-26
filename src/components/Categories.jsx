import { useEffect, useState } from "react"; 
import styled from "styled-components";
import { categories } from "../data.js";
import { mobile } from "../responsive.js";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: grid; // Use grid layout
  grid-template-columns: repeat(3, 1fr); // 3 equal columns
  gap: 20px; // Space between cards
  padding: 20px; // Padding around the grid
  ${mobile({
    padding: "0px",
    gridTemplateColumns: "repeat(2, 1fr)",
  })}// Adjust for mobile to 2 columns
`;

const Categories = () => {
  const [token, setToken] = useState(null); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token"); 
    console.log("Stored Token:", storedToken); 
    setToken(storedToken); 
  }, []); 

  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} token={token} /> 
      ))}
    </Container>
  );
};

export default Categories;
