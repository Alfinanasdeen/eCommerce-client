import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Import your components
import Home from "./pages/Home.jsx";
import ProductList from "./pages/ProductList.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import AddProduct from "./pages/AdminPage/AddProduct.jsx";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import DeleteProduct from "./pages/AdminPage/AdminDeleteProducts.jsx";
import EditProduct from "./pages/AdminPage/AdminEditProduct.jsx";
import ViewCostomer from "./pages/AdminPage/viewCostomer.jsx";
import AdminCartList from "./pages/AdminPage/AdminCartList.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Search from "./pages/Search.jsx";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const userType = user?.userType;

  const isAdmin = userType === "Admin";

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* General user routes */}
        {user && !isAdmin && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* Admin-specific routes */}
        {isAdmin && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/deleteProduct" element={<DeleteProduct />} />
            <Route path="/admin/editProduct" element={<EditProduct />} />
            <Route path="/admin/customer" element={<ViewCostomer />} />
            <Route path="/admin/cart" element={<AdminCartList />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/search" element={<Search />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="*" element={<Navigate to="/admin" />} />
          </>
        )}

        {/* Redirect to login if not authenticated */}
        {!user && <Route path="*" element={<Navigate to="/login" />} />}
      </Routes>
    </Router>
  );
};

export default App;
