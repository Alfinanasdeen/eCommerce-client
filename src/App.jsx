import Product from "./pages/Product.jsx";
import Home from "./pages/Home.jsx";
import ProductList from "./pages/ProductList.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/products/:category" element={<ProductList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
