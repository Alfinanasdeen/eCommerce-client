import { css } from "styled-components";

// Responsive breakpoints
export const mobile = (styles) => css`
  @media (max-width: 480px) {
    ${styles}
  }
`;

export const smallMobile = (styles) => css`
  @media (max-width: 375px) {
    ${styles}
  }
`;

export const tablet = (styles) => css`
  @media (max-width: 768px) {
    ${styles}
  }
`;

import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1000px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

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
  text-align: center;
  font-size: 2rem;
  color: #333;

  ${tablet`
    font-size: 1.8rem;
  `}

  ${mobile`
    font-size: 1.5rem;
  `}

  ${smallMobile`
    font-size: 1.3rem;
  `}
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* Enables horizontal scrolling on small screens */

  ${mobile`
    max-width: 100%;
  `}
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* Prevents table from shrinking too much */

  ${mobile`
    min-width: 100%;
  `}
`;

const TableHeader = styled.thead`
  background-color: #f1f1f1;

  th {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 1rem;

    ${mobile`
      font-size: 0.9rem;
      padding: 10px;
    `}
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 1rem;

  ${tablet`
    font-size: 0.9rem;
    padding: 10px;
  `}

  ${mobile`
    font-size: 0.8rem;
    padding: 8px;
  `}
`;

const NoProductsMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 1rem;

  ${mobile`
    font-size: 0.9rem;
  `}
`;

const AdminCartList = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/carts/admin/cart`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items for admin:", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <Container>
      <Title>Cart Items</Title>
      {cartItems.length === 0 ? (
        <NoProductsMessage>No cart items available</NoProductsMessage>
      ) : (
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </TableHeader>
            <tbody>
              {cartItems.map((cartItem) =>
                cartItem.products.length > 0 ? (
                  cartItem.products.map((product) => (
                    <TableRow key={product.productId?._id || Math.random()}>
                      <TableCell>
                        {cartItem.userId?.username || "Unknown User"}
                      </TableCell>
                      <TableCell>
                        {cartItem.userId?.email || "Unknown Email"}
                      </TableCell>
                      <TableCell>
                        {product.productId?.title || "Unknown Product"}
                      </TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        {product.productId?.price || "Unknown Price"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key={cartItem._id}>
                    <TableCell colSpan="5">No products in cart</TableCell>
                  </TableRow>
                )
              )}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminCartList;
