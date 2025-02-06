import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile, smallMobile, tablet } from "../responsive.js";
import PropTypes from "prop-types";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;

  ${tablet({ height: "55vh" })}
  ${smallMobile({ height: "40vh" })}
  ${mobile({ height: "30vh" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${tablet({ height: "55vh" })}
  ${smallMobile({ height: "40vh" })}
  ${mobile({ height: "30vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  padding: 20px;

  ${tablet({ height: "55vh" })}
  ${smallMobile({ height: "40vh", padding: "10px" })}
  ${mobile({ height: "30vh", padding: "5px" })}
`;

const Title = styled.h1`
  color: white;
  font-size: 2rem;
  margin-bottom: 20px;

  ${tablet({ fontSize: "1.8rem" })}
  ${smallMobile({ fontSize: "1.5rem", marginBottom: "15px" })}
  ${mobile({ fontSize: "1.2rem", marginBottom: "10px" })}
`;

const Button = styled.button`
  border: none;
  padding: 12px 18px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: lightgray;
  }

  ${tablet({ fontSize: "0.9rem", padding: "10px 15px" })}
  ${smallMobile({ fontSize: "0.85rem", padding: "8px 12px" })}
  ${mobile({ fontSize: "0.8rem", padding: "6px 10px" })}
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

CategoryItem.propTypes = {
  item: PropTypes.shape({
    cat: PropTypes.string,
    img: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default CategoryItem;
