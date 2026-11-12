import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/fetchUser";
import { Link } from "react-router-dom";
import Styles from "./_courseMarketplace.module.css";

const CourseMarketplace = () => {
  const { getAllCourses } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();

        console.log("COURSES RESPONSE:", response);

        // Handles response like { courses: [...] }
        // or directly [...]
        setCourses(response?.courses || response || []);
      } catch (error) {
        console.log("COURSES ERROR:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section className={Styles.loading}>
        <h2>Loading courses...</h2>
      </section>
    );
  }

  return (
    <section className={Styles.container}>
      {/* Header */}
      <article className={Styles.header}>
        <h1>Course Marketplace</h1>
        <p>Explore our courses and start learning today.</p>
      </article>

      {/* Courses */}
      {courses.length === 0 ? (
        <div className={Styles.empty}>
          <h2>No courses available</h2>
          <p>There are no courses available at the moment.</p>
        </div>
      ) : (
        <div className={Styles.course_grid}>
          {courses.map((course) => (
            <article className={Styles.course_card} key={course._id}>
              {/* Course Image */}
              <div className={Styles.course_image}>
                <img
                  src={
                    course.thumbnail ||
                    course.image ||
                    "https://via.placeholder.com/400x220"
                  }
                  alt={course.name || "Course"}
                />
              </div>

              {/* Course Content */}
              <div className={Styles.course_content}>
                <h2>{course.name || course.title}</h2>

                <p className={Styles.course_description}>
                  {course.description}
                </p>

                <div className={Styles.course_info}>
                  <span className={Styles.price}>₹{course.price || 0}</span>

                  {course.rating && (
                    <span className={Styles.rating}>⭐ {course.rating}</span>
                  )}
                </div>

                <Link
                  to={`/lms/course/${course._id}`}
                  className={Styles.view_button}
                >
                  View Course
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default CourseMarketplace;
