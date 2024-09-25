import styled from "styled-components";
import Navbar from "../components/Navbar.jsx";
import Announcement from "../components/Announcement.jsx";
import Products from "../components/Products.jsx";
import Newsletter from "../components/Newsletter.jsx";
import Footer from "../components/Footer.jsx";
import { mobile } from "../responsive.js";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2]; 
  const [filters, setFilters] = useState({});
  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";

  const getFilterOptions = (category) => {
    switch (category) {
      case "electronics":
        return (
          <>
            <Select name="brand" onChange={handleFilters}>
              <Option>Brand</Option>
              <Option>Brand A</Option>
              <Option>Brand B</Option>
              <Option>Brand C</Option>
            </Select>
            <Select name="warranty" onChange={handleFilters}>
              <Option>Warranty</Option>
              <Option>1 Year</Option>
              <Option>2 Years</Option>
            </Select>
          </>
        );
      case "fashion":
        return (
          <>
            <Select name="size" onChange={handleFilters}>
              <Option>Size</Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
            </Select>
            <Select name="color" onChange={handleFilters}>
              <Option>Color</Option>
              <Option>White</Option>
              <Option>Black</Option>
              <Option>Red</Option>
              <Option>Blue</Option>
              <Option>Yellow</Option>
            </Select>
          </>
        );
      case "home_living":
        return (
          <>
            <Select name="material" onChange={handleFilters}>
              <Option>Material</Option>
              <Option>Wood</Option>
              <Option>Plastic</Option>
              <Option>Metal</Option>
            </Select>
            <Select name="style" onChange={handleFilters}>
              <Option>Style</Option>
              <Option>Modern</Option>
              <Option>Classic</Option>
              <Option>Rustic</Option>
            </Select>
          </>
        );
      case "health_beauty":
        return (
          <>
            <Select name="skinType" onChange={handleFilters}>
              <Option>Skin Type</Option>
              <Option>Oily</Option>
              <Option>Dry</Option>
              <Option>Combination</Option>
            </Select>
            <Select name="brand" onChange={handleFilters}>
              <Option>Brand</Option>
              <Option>Brand X</Option>
              <Option>Brand Y</Option>
              <Option>Brand Z</Option>
            </Select>
          </>
        );
      case "sports_outdoors":
        return (
          <>
            <Select name="activity" onChange={handleFilters}>
              <Option>Activity</Option>
              <Option>Running</Option>
              <Option>Camping</Option>
              <Option>Cycling</Option>
            </Select>
            <Select name="brand" onChange={handleFilters}>
              <Option>Brand</Option>
              <Option>Brand 1</Option>
              <Option>Brand 2</Option>
            </Select>
          </>
        );
      case "toys_games":
        return (
          <>
            <Select name="ageGroup" onChange={handleFilters}>
              <Option>Age Group</Option>
              <Option>0-2 Years</Option>
              <Option>3-5 Years</Option>
              <Option>6-12 Years</Option>
            </Select>
            <Select name="category" onChange={handleFilters}>
              <Option>Category</Option>
              <Option>Educational</Option>
              <Option>Outdoor</Option>
              <Option>Creative</Option>
            </Select>
          </>
        );
      case "books_stationery":
        return (
          <>
            <Select name="genre" onChange={handleFilters}>
              <Option>Genre</Option>
              <Option>Fiction</Option>
              <Option>Non-Fiction</Option>
              <Option>Childrens</Option>
            </Select>
            <Select name="binding" onChange={handleFilters}>
              <Option>Binding</Option>
              <Option>Paperback</Option>
              <Option>Hardcover</Option>
            </Select>
          </>
        );
      case "automotive":
        return (
          <>
            <Select name="type" onChange={handleFilters}>
              <Option>Type</Option>
              <Option>Parts</Option>
              <Option>Accessories</Option>
              <Option>Tools</Option>
            </Select>
            <Select name="brand" onChange={handleFilters}>
              <Option>Brand</Option>
              <Option>Brand A</Option>
              <Option>Brand B</Option>
            </Select>
          </>
        );
      case "grocery":
        return (
          <>
            <Select name="type" onChange={handleFilters}>
              <Option>Type</Option>
              <Option>Fruits</Option>
              <Option>Vegetables</Option>
              <Option>Snacks</Option>
            </Select>
            <Select name="brand" onChange={handleFilters}>
              <Option>Brand</Option>
              <Option>Brand 1</Option>
              <Option>Brand 2</Option>
            </Select>
          </>
        );
      case "music_instruments":
        return (
          <>
            <Select name="instrumentType" onChange={handleFilters}>
              <Option>Instrument Type</Option>
              <Option>String</Option>
              <Option>Percussion</Option>
              <Option>Wind</Option>
            </Select>
            <Select name="brand" onChange={handleFilters}>
              <Option>Brand</Option>
              <Option>Brand A</Option>
              <Option>Brand B</Option>
            </Select>
          </>
        );
      case "pet_supplies":
        return (
          <>
            <Select name="petType" onChange={handleFilters}>
              <Option>Pet Type</Option>
              <Option>Dog</Option>
              <Option>Cat</Option>
              <Option>Bird</Option>
            </Select>
            <Select name="productType" onChange={handleFilters}>
              <Option>Product Type</Option>
              <Option>Food</Option>
              <Option>Toys</Option>
              <Option>Grooming</Option>
            </Select>
          </>
        );
      case "gardening":
        return (
          <>
            <Select name="plantType" onChange={handleFilters}>
              <Option>Plant Type</Option>
              <Option>Indoor</Option>
              <Option>Outdoor</Option>
              <Option>Herbs</Option>
            </Select>
            <Select name="toolType" onChange={handleFilters}>
              <Option>Tool Type</Option>
              <Option>Hand Tools</Option>
              <Option>Power Tools</Option>
            </Select>
          </>
        );
      default:
        return null; 
    }
  };

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat ? cat.toUpperCase() : "ALL PRODUCTS"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          {getFilterOptions(cat)}{" "}
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} search={search} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
