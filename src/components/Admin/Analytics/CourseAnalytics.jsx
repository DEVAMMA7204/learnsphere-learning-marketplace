import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/fetchUser";
import toast from "react-hot-toast";
import Styles from "./_courseAnalytics.module.css";

const CourseAnalytics = () => {
  const { getCourseAnalytics } = useAuth();

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getCourseAnalytics();

        console.log("ANALYTICS:", response);

        setAnalytics(response);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch course analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <h2>Loading analytics...</h2>;
  }

  return (
    <section className={Styles.container}>
      <article className={Styles.analytics_box}>
        <h1>Course Analytics</h1>

        <div className={Styles.analytics_list}>

          {/* Headings */}
          <div className={Styles.analytics_header}>
            <span>Month</span>
            <span>Date</span>
            <span>Count</span>
          </div>

          {/* Data */}
          {analytics?.courses?.last12Months?.map((item, index) => {
            const [month, date, year] = item.month.split(" ");

            return (
              <div className={Styles.analytics_item} key={index}>
                <span>{month}</span>
                <span>{date} {year}</span>
                <span>{item.count}</span>
              </div>
            );
          })}

        </div>
      </article>
    </section>
  );
};

export default CourseAnalytics;