import { useState } from "react";
import axios from "axios";

const categoriesList = [
  "electronics",
  "smartphones",
  "fashion",
  "home appliances",
  "books",
  "toys",
  "furniture",
  "sports",
  "beauty",
  "grocery",
  "automotive",
  "jewelry",
  "computers",
  "gaming",
  "music",
];

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    warranty: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        title,
        desc,
        img,
        categories: [selectedCategory], // Use the selected category
        filters, // Use the filters object directly
        price: parseFloat(price),
        inStock,
      };

      // Send a POST request to add the product
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`,
        productData
      );
      // Clear the form or show success message
      setTitle("");
      setDesc("");
      setImg("");
      setPrice("");
      setSelectedCategory("");
      setFilters({ brand: "", warranty: "" }); // Reset filters
      setInStock(true);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="add-product">
      <h1>Add New Product</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>In Stock:</label>
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
        </div>
        <div>
          <label>Brand:</label>
          <input
            type="text"
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          />
        </div>
        <div>
          <label>Warranty:</label>
          <input
            type="text"
            value={filters.warranty}
            onChange={(e) =>
              setFilters({ ...filters, warranty: e.target.value })
            }
          />
        </div>
        <div>
          <label>Select Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categoriesList.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
