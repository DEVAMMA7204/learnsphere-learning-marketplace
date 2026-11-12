import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../state-mangement/contextApi";
import Spinner from "../../../Spinner/Spinner";

const OrdersAnalytics = () => {
  const { getAllOrdersDashboard } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrdersDashboard();

        console.log("ORDERS ANALYTICS RESPONSE:", response);

        setOrders(response.orders || []);
      } catch (error) {
        console.log(
          "ORDERS ANALYTICS ERROR:",
          error.response?.data || error.message,
        );
      }
    };

    fetchOrders();
  }, [getAllOrdersDashboard]);

  if (!orders) {
    return <Spinner />;
  }

  return (
    <section>
      <h1>Orders Analytics</h1>

      <h2>Total Orders: {orders.length}</h2>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Course ID</th>
            <th>User ID</th>
            <th>Created At</th>
            <th>Payment Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>

              <td>{order.courseId}</td>

              <td>{order.userId}</td>

              <td>{new Date(order.createdAt).toLocaleDateString()}</td>

              <td>{order.payment_info?.status || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default OrdersAnalytics;
