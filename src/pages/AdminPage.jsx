import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <ul>
        <li>
          <Link to="/admin/add-product">Add New Product</Link>
        </li>
        {/* Other admin functionalities like View Users, Manage Orders */}
      </ul>
    </div>
  );
};

export default AdminPage;