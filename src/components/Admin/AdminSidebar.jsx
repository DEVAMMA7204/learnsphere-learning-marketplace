import { useState } from "react";
import { Link } from "react-router-dom";
import Styles from "./_admin.module.css";

const AdminSidebar = () => {
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  return (
    <aside className={Styles.sidebar}>
      {/* Users */}
      <Link to="/admin/admin-dashboard/users" className={Styles.main_link}>
        Users
      </Link>

      <Link to="/order/create-order" className={Styles.main_link}>
  Create Order
</Link>

      {/* Courses */}
      <div>
        <div className={Styles.main_link}>Courses</div>

        <div className={Styles.sub_links}>
          <Link to="/course/create-course">Create Course</Link>

          <Link to="/course/edit-course">Update Course</Link>
        </div>
      </div>

      {/* Analytics */}
      <div>
        <button
          type="button"
          className={Styles.main_link}
          onClick={() => setAnalyticsOpen(!analyticsOpen)}
        >
          <span>Analytics</span>

          <span>{analyticsOpen ? "▲" : "▼"}</span>
        </button>

        {analyticsOpen && (
          <div className={Styles.sub_links}>
            <Link to="/admin/admin-dashboard/analytics/users">
              Users Analytics
            </Link>

            <Link to="/admin/admin-dashboard/analytics/courses">
              Course Analytics
            </Link>

            <Link to="/admin/admin-dashboard/analytics/orders">
              Orders Analytics
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
