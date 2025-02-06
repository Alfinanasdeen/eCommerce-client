import styled from "styled-components";
import { mobile, smallMobile, tablet } from "../responsive.js";

const Container = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 40px;
  background: linear-gradient(90deg, teal, lightseagreen);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  transition: transform 0.3s ease;
  box-sizing: border-box;
  padding: 0 15px; /* Prevent text from touching screen edges */

  &:hover {
    transform: translateY(-2px);
  }

  ${tablet({ fontSize: "0.95rem", height: "38px", padding: "0 10px" })}
  ${mobile({ fontSize: "0.875rem", height: "35px", padding: "0 5px" })}
  ${smallMobile({ fontSize: "0.8rem", height: "30px", padding: "0 3px" })}
`;

const Announcement = () => {
  return <Container>Super Deal! Free Shipping on Orders Over $50</Container>;
};

export default Announcement;
