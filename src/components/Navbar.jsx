import { Search, ShoppingCartOutlined, Badge } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive.js";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 70px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  ${mobile({ height: "60px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 5px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 16px;
  cursor: pointer;
  font-weight: 500;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
`;

const SearchButton = styled.button`
  background: linear-gradient(90deg, teal, lightseagreen);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, lightseagreen, teal);
  }
`;

const SearchText = styled.span`
  margin-bottom: 3px;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 24px;
  color: #333;
  ${mobile({ fontSize: "20px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 16px;
  cursor: pointer;
  margin-left: 25px;
  font-weight: 500;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #4caf50;
  }
  ${mobile({ fontSize: "14px", marginLeft: "10px" })}
`;

const Select = styled.select`
  margin-left: 25px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  ${mobile({ fontSize: "14px", marginLeft: "10px" })}
`;

const categories = [
  { value: "", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home_living", label: "Home & Living" },
  { value: "health_beauty", label: "Health & Beauty" },
  { value: "sports_outdoors", label: "Sports & Outdoors" },
  { value: "toys_games", label: "Toys & Games" },
  { value: "books_stationery", label: "Books & Stationery" },
  { value: "automotive", label: "Automotive" },
  { value: "grocery", label: "Grocery" },
  { value: "music_instruments", label: "Music Instruments" },
  { value: "pet_supplies", label: "Pet Supplies" },
  { value: "gardening", label: "Gardening" },
];

const Navbar = () => {
  const cart = useSelector((state) => state.cart); // Get the cart state from Redux
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      navigate(`/products/${category}`);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    navigate("/search");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <SearchButton onClick={handleSearchClick}>
              <Search
                style={{ color: "white", fontSize: 16, marginRight: "10px" }}
              />
              <SearchText>Search</SearchText>
            </SearchButton>
          </SearchContainer>
        </Left>
        <Center>
          <Logo>TRENDLUX.</Logo>
        </Center>
        <Right>
          <Select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>
          <Link to="/cart">
            <MenuItem>
              <Badge
                badgeContent={cart.products.length || 0} // Ensure default value
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "12px",
                    backgroundColor: cart.products.length > 0 ? "teal" : "gray",
                    color: "white", // Ensure visibility of badge content
                  },
                }}
              >
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
