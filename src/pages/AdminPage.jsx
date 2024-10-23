import { Link } from "react-router-dom";
import styled from "styled-components";

const AdminDashboardContainer = styled.div`
  max-width: 800px;
  margin: 40px auto; /* Center the dashboard */
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15); /* Strong shadow for depth */
  text-align: center; /* Center content */
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: #333;
  margin-bottom: 30px; /* Increased spacing below the title */
  font-weight: bold; /* Bold title */
`;

const LinksList = styled.ul`
  list-style-type: none; /* Remove bullet points */
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 20px; /* Spacing between links */
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* Remove underline */
  color: #007bff; /* Link color */
  font-size: 1.2rem; /* Font size for links */
  padding: 12px 20px; /* Add padding for a button-like appearance */
  border-radius: 5px; /* Rounded corners for links */
  transition: color 0.3s, transform 0.3s; /* Smooth transition for color and transform effects */

  /* Center the link */
  display: inline-block;

  &:hover {
    color: black; /* Change color on hover */
    transform: scale(1.1); /* Scale up the link on hover */
  }

  &:active {
    transform: scale(0.9); /* Scale down the link when clicked */
  }
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
      </LinksList>
    </AdminDashboardContainer>
  );
};

export default AdminPage;
