import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { mobile,smallMobile, tablet } from "../../responsive.js";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
  padding: 20px;
  ${tablet`
    padding: 15px;
  `}

  ${mobile`
    padding: 10px;
  `}
`;

const Container = styled.div`
  width: 500px;
   ${tablet`
    width: 80%;
  `}

  ${mobile`
    width: 90%;
  `}

  ${smallMobile`
    width: 95%;
  `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  ${tablet`
    padding: 10px;
    font-size: 14px;
  `}

  ${mobile`
    padding: 8px;
    font-size: 14px;
  `}
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  ${tablet`
    padding: 10px;
    font-size: 14px;
  `}

  ${mobile`
    padding: 8px;
    font-size: 14px;
  `}
`;

const Option = styled.option`
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: darkcyan;
  }
  ${tablet`
    padding: 10px;
    font-size: 14px;
  `}

  ${mobile`
    padding: 8px;
    font-size: 14px;
  `}
`;

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    img: "",
    price: 0,
    categories: [],
    filters: {},
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [filters, setFilters] = useState({});

  const categoriesList = [
    "electronics",
    "fashion",
    "home_living",
    "health_beauty",
    "sports_outdoors",
    "toys_games",
    "books_stationery",
    "automotive",
    "grocery",
    "music_instruments",
    "pet_supplies",
    "gardening",
  ];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setFilters({});
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      ...product,
      categories: [selectedCategory],
      filters,
    };
    console.log("Submitting new product:", newProduct);

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`,
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product added successfully");
      window.location.href = `/products/${selectedCategory}`;
    } catch (error) {
      console.error("Error adding product:", error);
      alert(
        "Failed to add product. Please check your inputs or authorization."
      );
    }
  };

  const getFilterOptions = (category) => {
    switch (category) {
      case "electronics":
        return (
          <>
            <label>Brand:</label>
            <Select name="brand" onChange={handleFilterChange}>
              <Option value="">Select Brand</Option>
              <Option value="Brand A">Brand A</Option>
              <Option value="Brand B">Brand B</Option>
              <Option value="Brand C">Brand C</Option>
            </Select>
            <label>Warranty:</label>
            <Select name="warranty" onChange={handleFilterChange}>
              <Option value="">Select Warranty</Option>
              <Option value="1 Year">1 Year</Option>
              <Option value="2 Years">2 Years</Option>
            </Select>
          </>
        );
      case "fashion":
        return (
          <>
            <label>Size:</label>
            <Select name="size" onChange={handleFilterChange}>
              <Option value="">Select Size</Option>
              <Option value="XS">XS</Option>
              <Option value="S">S</Option>
              <Option value="M">M</Option>
              <Option value="L">L</Option>
              <Option value="XL">XL</Option>
            </Select>
            <label>Color:</label>
            <Select name="color" onChange={handleFilterChange}>
              <Option value="">Select Color</Option>
              <Option value="White">White</Option>
              <Option value="Black">Black</Option>
              <Option value="Red">Red</Option>
              <Option value="Blue">Blue</Option>
              <Option value="Yellow">Yellow</Option>
            </Select>
          </>
        );
      case "home_living":
        return (
          <>
            <label>Material:</label>
            <Select name="material" onChange={handleFilterChange}>
              <Option value="">Select Material</Option>
              <Option value="Wood">Wood</Option>
              <Option value="Plastic">Plastic</Option>
              <Option value="Metal">Metal</Option>
            </Select>
            <label>Style:</label>
            <Select name="style" onChange={handleFilterChange}>
              <Option value="">Select Style</Option>
              <Option value="Modern">Modern</Option>
              <Option value="Classic">Classic</Option>
              <Option value="Rustic">Rustic</Option>
            </Select>
          </>
        );
      case "health_beauty":
        return (
          <>
            <label>Skin Type:</label>
            <Select name="skinType" onChange={handleFilterChange}>
              <Option value="">Select Skin Type</Option>
              <Option value="Oily">Oily</Option>
              <Option value="Dry">Dry</Option>
              <Option value="Combination">Combination</Option>
            </Select>
            <label>Brand:</label>
            <Select name="brand" onChange={handleFilterChange}>
              <Option value="">Select Brand</Option>
              <Option value="Brand X">Brand X</Option>
              <Option value="Brand Y">Brand Y</Option>
              <Option value="Brand Z">Brand Z</Option>
            </Select>
          </>
        );
      case "sports_outdoors":
        return (
          <>
            <Select name="activity" onChange={handleFilterChange}>
              <Option>Activity</Option>
              <Option>Running</Option>
              <Option>Camping</Option>
              <Option>Cycling</Option>
            </Select>
            <Select name="brand" onChange={handleFilterChange}>
              <Option>Brand</Option>
              <Option>Brand 1</Option>
              <Option>Brand 2</Option>
            </Select>
          </>
        );
      case "toys_games":
        return (
          <>
            <Select name="ageGroup" onChange={handleFilterChange}>
              <Option>Age Group</Option>
              <Option>0-2 Years</Option>
              <Option>3-5 Years</Option>
              <Option>6-12 Years</Option>
            </Select>
            <Select name="category" onChange={handleFilterChange}>
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
            <Select name="genre" onChange={handleFilterChange}>
              <Option>Genre</Option>
              <Option>Fiction</Option>
              <Option>Non-Fiction</Option>
              <Option>Childrens</Option>
            </Select>
            <Select name="binding" onChange={handleFilterChange}>
              <Option>Binding</Option>
              <Option>Paperback</Option>
              <Option>Hardcover</Option>
            </Select>
          </>
        );
      case "automotive":
        return (
          <>
            <Select name="type" onChange={handleFilterChange}>
              <Option>Type</Option>
              <Option>Parts</Option>
              <Option>Accessories</Option>
              <Option>Tools</Option>
            </Select>
            <Select name="brand" onChange={handleFilterChange}>
              <Option>Brand</Option>
              <Option>Brand A</Option>
              <Option>Brand B</Option>
            </Select>
          </>
        );
      case "grocery":
        return (
          <>
            <Select name="type" onChange={handleFilterChange}>
              <Option>Type</Option>
              <Option>Fruits</Option>
              <Option>Vegetables</Option>
              <Option>Snacks</Option>
            </Select>
            <Select name="brand" onChange={handleFilterChange}>
              <Option>Brand</Option>
              <Option>Brand 1</Option>
              <Option>Brand 2</Option>
            </Select>
          </>
        );
      case "music_instruments":
        return (
          <>
            <Select name="instrumentType" onChange={handleFilterChange}>
              <Option>Instrument Type</Option>
              <Option>String</Option>
              <Option>Percussion</Option>
              <Option>Wind</Option>
            </Select>
            <Select name="brand" onChange={handleFilterChange}>
              <Option>Brand</Option>
              <Option>Brand A</Option>
              <Option>Brand B</Option>
            </Select>
          </>
        );
      case "pet_supplies":
        return (
          <>
            <Select name="petType" onChange={handleFilterChange}>
              <Option>Pet Type</Option>
              <Option>Dog</Option>
              <Option>Cat</Option>
              <Option>Bird</Option>
            </Select>
            <Select name="productType" onChange={handleFilterChange}>
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
            <Select name="plantType" onChange={handleFilterChange}>
              <Option>Plant Type</Option>
              <Option>Indoor</Option>
              <Option>Outdoor</Option>
              <Option>Herbs</Option>
            </Select>
            <Select name="toolType" onChange={handleFilterChange}>
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

  return (
    <Wrapper>
      <Container>
        <h1 style={{ marginBottom: "15px" }}>Add New Product</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Title"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
            required
          />
          <Input
            type="text"
            placeholder="Description"
            value={product.desc}
            onChange={(e) => setProduct({ ...product, desc: e.target.value })}
            required
          />
          <Input
            type="text"
            placeholder="Image URL"
            value={product.img}
            onChange={(e) => setProduct({ ...product, img: e.target.value })}
            required
          />
          <Input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
          <label>Category:</label>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          >
            <Option value="">Select Category</Option>
            {categoriesList.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>

          {/* Render filters based on selected category */}
          {getFilterOptions(selectedCategory)}

          <Button type="submit">Add Product</Button>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default AddProduct;
