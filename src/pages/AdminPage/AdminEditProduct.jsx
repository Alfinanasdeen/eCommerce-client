import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #333;
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
`;

const ProductDetails = styled.div`
  flex-grow: 1;
`;

const ProductTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const EditButton = styled.button`
  background-color: teal;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const NoProductsMessage = styled.p`
  text-align: center;
  color: #666;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  margin: 10px 0 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005f5f;
  }
`;

const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    title: "",
    price: "",
    desc: "",
    img: "",
    categories: [],
  });
  const [loading, setLoading] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data); // Set the products in state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle edit button click
  const handleEdit = (product) => {
    setEditProduct(product);
    setUpdatedProduct({
      title: product.title,
      price: product.price,
      desc: product.desc,
      img: product.img,
      categories: product.categories.join(", "),
    });
  };

  // Handle input changes for edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  // Handle product update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/admin/editProducts/${
          editProduct._id
        }`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product updated successfully");
      setLoading(false);
      fetchProducts(); // Refresh the products list
      setEditProduct(null); // Close the edit form after update
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, []);

  return (
    <Container>
      <Title>Product List</Title>
      {products.length === 0 ? (
        <NoProductsMessage>No products available</NoProductsMessage>
      ) : (
        <ProductList>
          {products.map((product) => (
            <ProductItem key={product._id}>
              <ProductImage src={product.img} alt={product.title} />
              <ProductDetails>
                <ProductTitle>{product.title}</ProductTitle>
              </ProductDetails>
              <EditButton onClick={() => handleEdit(product)}>Edit</EditButton>
            </ProductItem>
          ))}
        </ProductList>
      )}

      {editProduct && (
        <div>
          <Title>Edit Product</Title>
          <Form onSubmit={handleUpdate}>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={updatedProduct.title}
              onChange={handleChange}
            />

            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
            />

            <Label htmlFor="desc">Description</Label>
            <Input
              type="text"
              id="desc"
              name="desc"
              value={updatedProduct.desc}
              onChange={handleChange}
            />

            <Label htmlFor="img">Image URL</Label>
            <Input
              type="text"
              id="img"
              name="img"
              value={updatedProduct.img}
              onChange={handleChange}
            />

            <Label htmlFor="categories">Categories (Comma Separated)</Label>
            <Input
              type="text"
              id="categories"
              name="categories"
              value={updatedProduct.categories}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: {
                    ...e.target,
                    value: e.target.value.split(", "),
                  },
                })
              }
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Product"}
            </Button>
          </Form>
        </div>
      )}
    </Container>
  );
};

export default EditProduct;
