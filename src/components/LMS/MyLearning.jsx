import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/fetchUser";
import Styles from "./_myLearning.module.css";

const MyLearning = () => {
  const { getMyLearning } = useAuth();

  const [learning, setLearning] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("continueLearning");

  useEffect(() => {
    const fetchMyLearning = async () => {
      try {
        const response = await getMyLearning();

        console.log("MY LEARNING RESPONSE:", response);

        setLearning(response);
      } catch (error) {
        console.log(
          "MY LEARNING ERROR:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyLearning();
  }, []);

  const tabs = [
    {
      key: "continueLearning",
      label: "Continue Learning",
    },
    {
      key: "inProgress",
      label: "In Progress",
    },
    {
      key: "completed",
      label: "Completed",
    },
    {
      key: "wishlist",
      label: "Wishlist",
    },
    {
      key: "certificates",
      label: "Certificates",
    },
  ];

  if (loading) {
    return (
      <section className={Styles.loading}>
        <h2>Loading my learning...</h2>
      </section>
    );
  }

  const activeData = learning?.[activeTab] || [];

  return (
    <section className={Styles.container}>

      <div className={Styles.header}>
        <h1>My Learning</h1>
        <p>Track your courses and learning progress.</p>
      </div>

      {/* Tabs */}
      <div className={Styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={
              activeTab === tab.key
                ? Styles.active_tab
                : Styles.tab
            }
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={Styles.content}>

        {activeData.length === 0 ? (
          <div className={Styles.empty}>
            <h2>
              No{" "}
              {tabs.find((tab) => tab.key === activeTab)?.label}
            </h2>

            <p>
              There are no courses available in this section.
            </p>
          </div>
        ) : (
          <div className={Styles.course_grid}>
            {activeData.map((item) => (
              <div
                className={Styles.course_card}
                key={item._id}
              >
                <h3>
                  {item.name || item.title}
                </h3>
              </div>
            ))}
          </div>
        )}

      </div>

    </section>
  );
};

export default MyLearning;