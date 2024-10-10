import { useEffect, useState } from "react"; 
import styled from "styled-components";
import { categories } from "../data.js";
import { mobile } from "../responsive.js";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px; 
  padding: 20px; 
  ${mobile({
    padding: "0px",
    gridTemplateColumns: "repeat(2, 1fr)",
  })}
`;

const Categories = () => {
  const [token, setToken] = useState(null); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token"); 
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
