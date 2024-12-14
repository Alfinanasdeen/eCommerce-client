import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../redux/cartRedux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive.js";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
  justify-content: center;
  margin-left: 300px;
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px 150px 50px 250px;
  padding: 35px;
  border-radius: 10px;
  background: ${({ index }) =>
    index % 2 === 0
      ? "linear-gradient(90deg, #dff5f1, #c8ede7)"
      : "linear-gradient(90deg, #e9fefe, #d3f9f6)"};
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);

  ${mobile({ flexDirection: "column", marginLeft: "0px" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  margin: 30px;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductPay = styled.button`
  padding: 5px 10px;
  background: linear-gradient(90deg, teal, lightseagreen);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  margin-top: 40px;

  &:hover {
    background-color: #0056b3;
  }
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const ProductName = styled.span`
  font-size: 25px;
  font-weight: 800px;
  color: #333;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s ease, text-shadow 0.3s ease;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const RemoveButton = styled.button`
  padding: 5px 10px;
  background: linear-gradient(90deg, red, teal, lightseagreen);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background: linear-gradient(90deg, darkred, darkcyan, seagreen);
    transform: scale(1.05);
  }

  &:active {
    background: linear-gradient(90deg, crimson, mediumseagreen, darkslategrey);
    transform: scale(1);
  }
`;

// Cart Component
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopTexts>
            <TopText>Shopping Bag ({cart.products.length})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} alt={product.title} />
                  <Details>
                    <ProductName>{product.title}</ProductName>
                    <RemoveButton onClick={() => handleRemove(product._id)}>
                      Remove
                    </RemoveButton>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ProductAmount>Quantity: {product.quantity}</ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                  <Link
                    to={`/product/${product._id}?quantity=${product.quantity}`}
                  >
                    <ProductPay>Click to Pay</ProductPay>
                  </Link>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
