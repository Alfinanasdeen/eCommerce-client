import { Badge } from "@mui/icons-material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive.js";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin-left: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Select = styled.select`
  margin-left: 25px;
  padding: 5px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
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
  const quantity = useSelector((state) => state.cart.quantity);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      navigate(`/products/${category}`);
    }
  };

  const handleSearchClick = () => {
    // Navigate to the search page when the button is clicked
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
                style={{ color: "white", fontSize: 16, marginRight: "5px" }}
              />
              Search
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
              <Badge badgeContent={quantity} color="primary">
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
