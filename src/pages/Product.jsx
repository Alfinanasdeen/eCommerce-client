import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import Newsletter from "../components/Newsletter.jsx";
import { mobile } from "../responsive.js";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import Payment from "./Payment.jsx";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Container = styled.div`
  background-color: #f5f5f5;
  font-family: "Arial", sans-serif;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
  border-radius: 10px;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 80px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 2.5rem;
  color: #333;
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 2rem;
  color: #007b5e;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px 10px;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #007b5e;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  color: #007b5e;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 15px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(90deg, lightseagreen, teal, #f5f5f5);
  color: white;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background-color: #005f46;
    transform: scale(1.05);
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(
    Number(searchParams.get("quantity")) || 1 // Default to query parameter or 1
  );
  const dispatch = useDispatch();

  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/find/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(res.data);
        setTotalAmount(res.data.price * quantity);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id, quantity]); // Dependency on quantity ensures updates when it changes

  // Adjust quantity and recalculate total amount
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity((prev) => prev - 1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  // Add product to cart with updated quantity
  const handleClick = async () => {
    // Extract userId from localStorage
    const userData = JSON.parse(localStorage.getItem("persist:root"))?.user;
    const userId = userData ? JSON.parse(userData).currentUser._id : null;

    // Check if user is logged in
    if (!userId) {
      alert("User not logged in. Please log in to add products to your cart.");
      return;
    }

    // Proceed to add the product to the cart
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      const cartData = {
        userId, // Include userId
        products: [
          {
            productId: product._id, // Product's unique ID
            quantity,
          },
        ],
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/carts/cart`,
        cartData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        }
      );

      console.log("Cart updated successfully:", res.data);
      dispatch(addProduct({ ...product, quantity }));
      alert(`Added ${quantity} of ${product.title} to the cart.`);
    } catch (err) {
      console.error("Error adding product to cart:", err);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        {product ? (
          <>
            <ImgContainer>
              <Image src={product.img} alt={product.title} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Price>$ {totalAmount}</Price>
              <AddContainer>
                <AmountContainer>
                  <Remove
                    onClick={() => handleQuantity("dec")}
                    style={{ cursor: "pointer" }}
                  />
                  <Amount>{quantity}</Amount> {/* Displays quantity */}
                  <Add
                    onClick={() => handleQuantity("inc")}
                    style={{ cursor: "pointer" }}
                  />
                </AmountContainer>
                <Button onClick={handleClick}>ADD TO CART</Button>
              </AddContainer>
              <Payment
                totalAmount={totalAmount}
                resetTotalAmount={setTotalAmount}
              />
            </InfoContainer>
          </>
        ) : (
          <h2>Product not found.</h2>
        )}
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
