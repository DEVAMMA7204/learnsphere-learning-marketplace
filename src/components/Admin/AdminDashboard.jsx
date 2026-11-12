import Styles from "./_admin.module.css";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  return (
    <section className={Styles.admin_dashboard}>
      <article className={Styles.admin_container}>
        
        <aside className={Styles.sidebar_container}>
          <AdminSidebar />
        </aside>

        <main className={Styles.content_container}>
          <Outlet />
        </main>

      </article>
    </section>
  );
};

export default AdminDashboard;