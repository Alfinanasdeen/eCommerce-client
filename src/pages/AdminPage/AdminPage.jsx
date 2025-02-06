import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile, smallMobile, tablet } from "../../responsive.js";

const AdminDashboardContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  ${tablet`
    max-width: 90%;
    padding: 15px;
  `}

  ${mobile`
    max-width: 95%;
    padding: 10px;
  `}
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: #333;
  margin-bottom: 30px;
  font-weight: bold;

  ${tablet`
    font-size: 2.2rem;
  `}

  ${mobile`
    font-size: 1.8rem;
  `}

  ${smallMobile`
    font-size: 1.5rem;
  `}
`;

const LinksList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 20px;
  ${mobile`
    margin-bottom: 15px;
  `}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-size: 1.2rem;
  padding: 12px 20px;
  border-radius: 5px;
  transition: color 0.3s, transform 0.3s;

  /* Center the link */
  display: inline-block;

  &:hover {
    color: black;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
  ${tablet`
    font-size: 1rem;
    padding: 10px 15px;
  `}

  ${mobile`
    font-size: 0.9rem;
    padding: 8px 12px;
  `}

  ${smallMobile`
    font-size: 0.8rem;
    padding: 6px 10px;
  `}
`;

const AdminPage = () => {
  return (
    <AdminDashboardContainer>
      <Title>Admin Dashboard</Title>
      <LinksList>
        <LinkItem>
          <StyledLink to="/">Home</StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/admin/add-product">Add New Product</StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/admin/deleteProduct">
            Delete Existing Product
          </StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/admin/editProduct">Edit Existing Product</StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/admin/customer">Customer Detail</StyledLink>
        </LinkItem>
        <LinkItem>
          <StyledLink to="/admin/cart">Cart Detail</StyledLink>
        </LinkItem>
      </LinksList>
    </AdminDashboardContainer>
  );
};

export default AdminPage;
