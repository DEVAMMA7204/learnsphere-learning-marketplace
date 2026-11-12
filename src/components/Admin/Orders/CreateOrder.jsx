import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../state-mangement/contextApi";

const CreateOrder = () => {
  const { createOrder } = useContext(AuthContext);

  const [courseId, setCourseId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [status, setStatus] = useState("succeeded");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createOrder({
        courseId,
        payment_info: {
          id: paymentId,
          status,
        },
      });

      console.log("ORDER CREATED:", response);
      alert("Order created successfully");
    } catch (error) {
      console.log("CREATE ORDER ERROR:", error);
      alert("Failed to create order");
    }
  };

  return (
    <section>
      <h1>Create Order</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Course ID</label>

          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            placeholder="Enter Course ID"
          />
        </div>

        <div>
          <label>Payment ID</label>

          <input
            type="text"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            placeholder="pi_123456789"
          />
        </div>

        <div>
          <label>Payment Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="succeeded">succeeded</option>
            <option value="failed">failed</option>
          </select>
        </div>

        <button type="submit">
          Create Order
        </button>
      </form>
    </section>
  );
};

export default CreateOrder;