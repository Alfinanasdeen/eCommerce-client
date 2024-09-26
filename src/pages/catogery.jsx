// import { Add, Remove } from "@mui/icons-material";
// import styled from "styled-components";
// import Announcement from "../components/Announcement.jsx";
// import Footer from "../components/Footer.jsx";
// import Navbar from "../components/Navbar.jsx";
// import Newsletter from "../components/Newsletter.jsx";
// import { mobile } from "../responsive.js";
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// //import { publicRequest } from "../requestMethods.js";
// import { addProduct } from "../redux/cartRedux";
// import { useDispatch } from "react-redux";
// import {
//   electronics,

//   // Import other categories as needed
// } from "../catagory_data.js";
// const Container = styled.div``;

// const Wrapper = styled.div`
//   padding: 50px;
//   display: flex;
//   ${mobile({ padding: "10px", flexDirection: "column" })}
// `;

// const ImgContainer = styled.div`
//   flex: 1;
// `;

// const Image = styled.img`
//   width: 100%;
//   height: 90vh;
//   object-fit: cover;
//   ${mobile({ height: "40vh" })}
// `;

// const InfoContainer = styled.div`
//   flex: 1;
//   padding: 0px 50px;
//   ${mobile({ padding: "10px" })}
// `;

// const Title = styled.h1`
//   font-weight: 200;
// `;

// const Desc = styled.p`
//   margin: 20px 0px;
// `;

// const Price = styled.span`
//   font-weight: 100;
//   font-size: 40px;
// `;

// const AddContainer = styled.div`
//   width: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   ${mobile({ width: "100%" })}
// `;

// const AmountContainer = styled.div`
//   display: flex;
//   align-items: center;
//   font-weight: 700;
// `;

// const Amount = styled.span`
//   width: 30px;
//   height: 30px;
//   border-radius: 10px;
//   border: 1px solid teal;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0px 5px;
// `;

// const Button = styled.button`
//   padding: 15px;
//   border: 2px solid teal;
//   background-color: white;
//   cursor: pointer;
//   font-weight: 500;

//   &:hover {
//     background-color: #f8f4f4;
//   }
// `;

// const Product = () => {
//   const location = useLocation();
//   const id = location.pathname.split("/")[2];
//   const [product, setProduct] = useState({});
//   const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Function to find the product in category_data
//     const findProduct = () => {
//       const allCategories = { electronics }; // Add other categories here
//       for (const category in allCategories) {
//         const foundProduct = allCategories[category].find(
//           (item) => item.id === parseInt(id)
//         );
//         if (foundProduct) {
//           setProduct(foundProduct);
//           break; // Stop searching once we find the product
//         }
//       }
//     };

//     findProduct();
//   }, [id]);

//   const handleQuantity = (type) => {
//     if (type === "dec") {
//       quantity > 1 && setQuantity(quantity - 1);
//     } else {
//       setQuantity(quantity + 1);
//     }
//   };

//   const handleClick = () => {
//     dispatch(addProduct({ ...product, quantity }));
//   };
//   return (
//     <Container>
//       <Navbar />
//       <Announcement />
//       <Wrapper>
//         <ImgContainer>
//           <Image src={product.img} />
//         </ImgContainer>
//         <InfoContainer>
//           <Title>{product.title}</Title>
//           <Desc>{product.desc}</Desc>
//           <Price>$ {product.price}</Price>
//           <AddContainer>
//             <AmountContainer>
//               <Remove onClick={() => handleQuantity("dec")} />
//               <Amount>{quantity}</Amount>
//               <Add onClick={() => handleQuantity("inc")} />
//             </AmountContainer>
//             <Button onClick={handleClick}>ADD TO CART</Button>
//           </AddContainer>
//         </InfoContainer>
//       </Wrapper>
//       <Newsletter />
//       <Footer />
//     </Container>
//   );
// };

// export default Product;
