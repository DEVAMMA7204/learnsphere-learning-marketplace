import React, { useState } from "react";
import { useAuth } from "../../hooks/fetchUser";
import Styles from "./_payments.module.css";

const Payments = () => {
  const { createPayment } = useAuth();

  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        courseId,
      };

      const response = await createPayment(payload);

      console.log("PAYMENT RESPONSE:", response);
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={Styles.container}>
      <article className={Styles.payment_box}>

        <div className={Styles.header}>
          <h1>Create Payment</h1>
          <p>
            Enter the course ID to proceed with payment.
          </p>
        </div>

        <form
          className={Styles.form}
          onSubmit={handlePayment}
        >
          <div className={Styles.field}>
            <label>Course ID</label>

            <input
              type="text"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              placeholder="Enter course ID"
              required
            />
          </div>

          <button
            type="submit"
            className={Styles.payment_button}
            disabled={loading}
          >
            {loading
              ? "Creating Order..."
              : "Create Payment"}
          </button>
        </form>

      </article>
    </section>
  );
};

export default Payments;